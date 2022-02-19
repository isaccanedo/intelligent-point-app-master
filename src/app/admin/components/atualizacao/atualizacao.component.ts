import { Funcionario } from './../../../shared/models/funcionario.model';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import {
  Lancamento,
  Tipo,
  LancamentoService
} from './../../../shared';

import * as moment from 'moment';

const FUNCIONARIO_ID = 'funcionarioId';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit {
  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[];
  tipo: Tipo;

  lancamentoId: string;
  localizacao: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.lancamentoId = this.route.snapshot.paramMap.get('lancamentoId');
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO,
      Tipo.TERMINO_TRABALHO
    ];
    this.gerarForm();
    this.obterDadosLancamento();
  }

  obterDadosLancamento() {
    this.lancamentoService.buscarPorId(this.lancamentoId)
      .subscribe(
        dados => {
          const data = dados.data.data;
          this.form.get('data').setValue(new Date(data));
          this.form.get('horas').setValue(data.substr(11, 2));
          this.form.get('minutos').setValue(data.substr(14, 2));
          this.form.get('tipo').setValue(dados.data.tipo);
          this.localizacao = dados.data.localizacao;
        },
        err => {
          const msg = 'Erro obtendo lançamento';
          this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
          this.router.navigate(['/admin']);
        }
      );
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
    const numeros: string[] = Array();

    for (let i = inicio; i <= termino; i++) {
      if (i < 10) {
        numeros.push('0' + i.toString());
      } else {
        numeros.push(i.toString());
      }
    }
    return numeros;
  }

  gerarForm() {
    this.form = this.formBuilder.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    });
  }

  atualizar() {
    if (this.form.invalid) { return; }

    const dados = this.form.value;
    this.lancamentoService.atualizar(this.obterLancamento(dados))
      .subscribe(
        data => {
          const msg = 'Lançamento atualizado com sucesso!';
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
      this.localizacao,
      this.funcionarioId,
      Number(this.lancamentoId)
    );
  }

  get funcionarioId(): string {
    return sessionStorage[FUNCIONARIO_ID];
  }
}
