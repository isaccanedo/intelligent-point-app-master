import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

const TOKEN = 'token';

@Injectable()
export class HttpUtilService {
  constructor() { }

  headers() {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if (localStorage[TOKEN]) {
      httpHeaders = httpHeaders.set(
        'Authorization', 'Bearer ' + localStorage[TOKEN]
      );
    }

    return { headers: httpHeaders };
  }

  obterIdUsuario(): string {
    if (!localStorage[TOKEN]) {
      return '';
    }
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.id : '';
  }

  obterIdEmpresa(): string {
    if (!localStorage[TOKEN]) {
      return '';
    }
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.empresaId : '';
  }

  obterDadosUsuario() {
    if (!localStorage[TOKEN]) {
      return '';
    }
    return JSON.parse(atob(localStorage[TOKEN].split('.')[1]));
  }

  obterPerfil(): string {
    if (!localStorage[TOKEN]) { return ''; }

    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.role : '';
  }
}
