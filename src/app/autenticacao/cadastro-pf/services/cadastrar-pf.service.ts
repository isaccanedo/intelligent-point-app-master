import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastroPf } from '../';

@Injectable()
export class CadastrarPfService {

  private readonly PATH: string = 'cadastrar-pf';

  constructor(private httpClient: HttpClient) { }

  cadastrar(cadastroPf: CadastroPf): Observable<any> {
    return this.httpClient.post(environment.baseApiUrl + this.PATH, cadastroPf);
  }
}
