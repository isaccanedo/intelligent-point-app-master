import { Pipe, PipeTransform } from '@angular/core';
import { Tipo } from '../models';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(tipo: Tipo, args?: any): string {
    return this.obterTexto(tipo);
  }

  obterTexto(tipo: Tipo): string {
    let descricao: string;
    switch (tipo) {
      case Tipo.INICIO_TRABALHO: descricao = 'Início do trabalho'; break;
      case Tipo.INICIO_ALMOCO: descricao = 'Início do almoço'; break;
      case Tipo.TERMINO_ALMOCO: descricao = 'Término do almoço'; break;
      case Tipo.TERMINO_TRABALHO: descricao = 'Término do trabalho'; break;
      default: descricao = tipo; break;
    }
    return descricao;
  }

}
