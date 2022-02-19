import { FuncionarioService } from './../../../shared/services/funcionario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpUtilService } from './../../../shared/services/http-util.service';
import { LancamentoService } from './../../../shared/services/lancamento.service';
import { MatTableDataSource, MatSnackBar, PageEvent, MatSort, MatSelect, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Lancamento, Funcionario } from 'src/app/shared/models';

const DATA = 'data';
const TIPO = 'tipo';
const VALUE = 'value';
const FUNCIONARIO_ID = 'funcionarioId';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = [DATA, TIPO, 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  funcionarios: Funcionario[];
  @ViewChild(MatSelect)
  matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(
    private lancamentoService: LancamentoService,
    private httpUtilService: HttpUtilService,
    private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterFuncionarios();
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.formBuilder.group({
      funcs: ['', []]
    });
  }

  ordemPadrao() {
    this.ordem = DATA;
    this.direcao = 'DESC';
  }

  get funcId(): string {
    return sessionStorage[FUNCIONARIO_ID] || false;
  }

  obterFuncionarios() {
    this.funcionarioService.listaFuncionarioPorEmpresa()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtilService.obterIdUsuario();
          this.funcionarios = (data.data as Funcionario[])
            .filter(func => func.id !== usuarioId);

          if (this.funcId) {
            this.form.get('funcs').setValue(parseInt(this.funcId, 10));
            this.exibirLancamentos();
          }
        },
        err => {
          const msg = 'Erro obtendo funcionários.';
          this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
        }
      );
  }

  exibirLancamentos() {
    if (this.matSelect.selected) {
      this.funcionarioId = this.matSelect.selected[VALUE];
    } else if (this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }

    sessionStorage[FUNCIONARIO_ID] = this.funcionarioId;

    this.lancamentoService.listarLancamentosPorFuncionario(
      this.funcionarioId, this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalLancamentos = data[DATA].totalElements;
          const lancamentos = data[DATA].content as Lancamento[];
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
        },
        err => {
          const msg = 'Erro obtendo lançamentos.';
          this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
        }
      );
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: MatSort) {
    if (sort.direction === '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }

  removerDialog(lancamentoId: string) {
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed().subscribe(
      remover => {
        if (remover) {
          this.remover(lancamentoId);
        }
      });
  }

  remover(lancamentoId: string) {
    this.lancamentoService.remover(lancamentoId)
      .subscribe(
        data => {
          const msg = 'Lançamento removido com sucesso!';
          this.matSnackBar.open(msg, 'Sucesso', { duration: 6000 });
          this.exibirLancamentos();
        },
        err => {
          let msg = 'Tente novamente.';
          if (err.status === 400) {
            msg = err.error.errors.join(' ');
          }
          this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
        }
      );
  }
}

@Component({
  selector: 'confirmar-dialog',
  template: `
    <h1 mat-dialog-title>Deseja realmente remover o lançamento?</h1>
    <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="false" tabindex="-1">
      Não
      </button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">
      Sim
      </button>
    </div>
    `,
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

