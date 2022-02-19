import { LancamentoService } from './../../../shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Lancamento } from 'src/app/shared';
import { MatTableDataSource, MatSnackBar, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private lancamentoService: LancamentoService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos()
      .subscribe(
        data => {
          const lancamentos = data['data'] as Lancamento[];
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg = 'Erro obtendo lançamentos.';
          this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
        }
      );
  }

}
