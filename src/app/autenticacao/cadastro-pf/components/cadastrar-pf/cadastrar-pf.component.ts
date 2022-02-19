import { CnpjValidator, CpfValidator } from './../../../../shared';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CadastroPf } from '../../models';
import { SomenteNumeros } from 'src/app/shared/utils';
import { CadastrarPfService } from '../../services';

@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html',
  styleUrls: ['./cadastrar-pf.component.css']
})
export class CadastrarPfComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private cadastrarPfService: CadastrarPfService
  ) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      cnpj: ['', [Validators.required, CnpjValidator]]
    });
  }

  cadastrarPf() {
    if (this.form.invalid) {
      return;
    }

    const cadastroPf: CadastroPf = this.form.value;
    cadastroPf.cnpj = new SomenteNumeros(cadastroPf.cnpj).formato();
    cadastroPf.cpf = new SomenteNumeros(cadastroPf.cpf).formato();

    this.cadastrarPfService.cadastrar(cadastroPf)
      .subscribe(
        data => {
          const msg = 'Autenticação obrigatória.';
          this.matSnackBar.open(msg, 'Sucesso', { duration: 6000 });
          this.router.navigate(['/login']);
        },
        err => {
          let msg = 'Tente novamente.';
          if (err.status === 400) {
            msg = err.error.errors.join(' ');
          }
          this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
        }
      );
    return false;
  }

}
