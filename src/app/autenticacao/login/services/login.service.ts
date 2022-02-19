import { environment as env } from './../../../../environments/environment';
import { Login } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  private readonly PATH: string = 'auth';

  constructor(private httpClient: HttpClient) { }

  logar(login: Login): Observable<any> {
    return this.httpClient.post(env.baseUrl + this.PATH, login);
  }
}
