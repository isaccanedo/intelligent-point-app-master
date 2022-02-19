import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './http-util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FuncionarioService {

  private readonly PATH = 'funcionarios';
  private readonly PATH_FUNCIONARIO_POR_EMPRESA = '/empresa/{empresaId}';

  constructor(
    private httpClient: HttpClient,
    private httpUtilService: HttpUtilService
  ) { }

  listaFuncionarioPorEmpresa(): Observable<any> {
    return this.httpClient.get(
      environment.baseApiUrl + this.PATH +
      this.PATH_FUNCIONARIO_POR_EMPRESA.replace(
        '{empresaId}', this.httpUtilService.obterIdEmpresa()),
      this.httpUtilService.headers()
    );
  }
}
