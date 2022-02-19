import { Tipo, HttpUtilService, LancamentoService, Lancamento } from './../../../shared';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

declare var navigator: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(
    private matSnackBar: MatSnackBar,
    private router: Router,
    private httUtil: HttpUtilService,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit() {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.obterGeoLocation();
    this.ultimoTipoLancado = '';
    this.obterUltimoLancamento();
  }

  obterGeoLocation(): string {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`);
    }
    return '';
  }

  iniciarTrabalho() {
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  terminarTrabalho() {
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  iniciarAlmoco() {
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco() {
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  obterUltimoLancamento() {
    this.lancamentoService.buscarUltimoTipoLancado()
    .subscribe(
      data => {
        this.ultimoTipoLancado = data.data ? data.data.tipo : '';
      },
      err => {
        const msg = 'Erro obtendo último lançamento.';
        this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
      }
    );
  }

  cadastrar(tipo: Tipo) {
    const lancamento: Lancamento = new Lancamento(
      this.dataAtualEn,
      tipo,
      this.geoLocation,
      this.httUtil.obterIdUsuario()
    );

    this.lancamentoService.cadastrar(lancamento)
    .subscribe(
      data => {
        const msg = 'Lançamento realizado com sucesso!';
        this.matSnackBar.open(msg, 'Sucesso', { duration: 6000 });
        this.router.navigate(['/funcionario/listagem']);
      },
      err => {
        let msg = 'Tente novamente';
        if (err.status === 400) {
          msg = err.error.errors.join(' ');
        }
        this.matSnackBar.open(msg, 'Erro', { duration: 6000});
      }
    );
  }

  obterUrlMapa(): string {
    return 'https://www.google.com/maps/search/?api=1&query=' + this.geoLocation;
  }

  exibirInicioTrabalho(): boolean {
    return this.ultimoTipoLancado === '' || this.ultimoTipoLancado === Tipo.TERMINO_TRABALHO;
  }

  exibirTerminoTrabalho(): boolean {
    return this.ultimoTipoLancado === Tipo.INICIO_TRABALHO || this.ultimoTipoLancado === Tipo.TERMINO_ALMOCO;
  }

  exibirInicioAlmoco(): boolean {
    return this.ultimoTipoLancado === Tipo.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultimoTipoLancado === Tipo.INICIO_ALMOCO;
  }

}
