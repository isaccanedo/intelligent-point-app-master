export class SomenteNumeros {

    constructor(private valor: any) { }

    formato(): any {
      if (typeof (this.valor) === 'string') {
        return this.valor.replace(/[^\d]+/g, '');
      }
      return this.valor;
    }

  }
