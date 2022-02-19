import { Lancamento } from './../models/lancamento.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './http-util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LancamentoService {

  private readonly PATH = 'lancamentos';
  private readonly PATH_ULTIMO_LANCAMENTO = '/funcionario/{funcionarioId}/ultimo';
  private readonly PATH_LANCAMENTO = '/funcionario/{funcionarioId}';
  private readonly PATH_TODOS_LANCAMENTO = '/funcionario/{funcionarioId}/todos';


  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService) { }

  buscarUltimoTipoLancado(): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + this.PATH +
      this.PATH_ULTIMO_LANCAMENTO.replace(
        '{funcionarioId}', this.httpUtil.obterIdUsuario()),
      this.httpUtil.headers()
    );
  }

  cadastrar(lancamento: Lancamento): Observable<any> {
    return this.http.post(
      environment.baseApiUrl + this.PATH,
      lancamento,
      this.httpUtil.headers()
    );
  }

  listarTodosLancamentos(): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + this.PATH +
      this.PATH_TODOS_LANCAMENTO.replace(
        '{funcionarioId}', this.httpUtil.obterIdUsuario()),
      this.httpUtil.headers()
    );
  }

  listarLancamentosPorFuncionario(
    funcionarioId: string,
    pagina: number,
    ordem: string,
    direcao: string): Observable<any> {
    const url: string = environment.baseApiUrl + this.PATH + this.PATH_LANCAMENTO.replace('{funcionarioId}', funcionarioId);
    const params: string = '?pag=' + pagina + '&ord=' + ordem + '&dir=' + direcao;

    return this.http.get(url + params, this.httpUtil.headers());
  }

  remover(lancamentoId: string): Observable<any> {
    return this.http.delete(
      environment.baseApiUrl + this.PATH + '/' + lancamentoId,
      this.httpUtil.headers()
    );
  }

  buscarPorId(lancamentoId: string): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + this.PATH + '/' + lancamentoId, this.httpUtil.headers()
    );
  }

  atualizar(lancamento: Lancamento): Observable<any> {
    return this.http.put(
      environment.baseApiUrl + this.PATH + '/' + lancamento.id,
      lancamento,
      this.httpUtil.headers()
    );
  }

}
