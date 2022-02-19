import { Lancamento } from './../../../shared/models/lancamento.model';
import { Tipo } from './../../../shared/models/tipo.enum';
import { LancamentoService } from './../../../shared/services/lancamento.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',

  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[];
  tipo: Tipo;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.gerarForm();
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO,
      Tipo.TERMINO_TRABALHO
    ];
  }

  gerarForm() {
    this.form = this.formBuilder.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    });
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
    const numeros: string[] = Array();
    for (let i = inicio; i <= termino; i++) {
      let numero = i.toString();
      if (i < 10) {
        numero = "0" + numero;
      }
      numeros.push(numero);
    }
    return numeros;
  }

  cadastrar() {
    if (this.form.invalid) {
      return;
    }

    const dados = this.form.value;
    this.lancamentoService.cadastrar(this.obterLancamento(dados))
      .subscribe(
        data => {
          const msg = 'Lancamento cadastrado com sucesso!';
          this.matSnackBar.open(msg, 'Sucesso', { duration: 6000 });
          this.router.navigate(['/admin']);
        },
        err => {
          let msg = 'Tente novamente em instantes.';
          if (err.status === 400) {
            msg = err.error.errors.join(' ');
          }
          this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
        }
      );
  }

  obterLancamento(dados: any): Lancamento {
    const data = moment(dados.data);
    data.set({
      hour: dados.horas,
      minute: dados.minutos,
      second: 0
    });

    return new Lancamento(
      data.format('YYYY-MM-DD HH:mm:ss'),
      dados.tipo,
      '',
      this.funcionarioId
    );
  }

  get funcionarioId(): string {
    return sessionStorage['funcionarioId'];
  }

}
