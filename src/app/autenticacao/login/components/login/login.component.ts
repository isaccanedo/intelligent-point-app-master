import { LoginService } from './../../services';
import { Login } from './../../models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {

  }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logar() {
    if (this.form.invalid) {
      return;
    }

    const login: Login = this.form.value;
    const DATA = 'data';
    const TOKEN = 'token';
    const ROLE = 'role';
    this.loginService.logar(login)
      .subscribe(
        data => {
          localStorage[TOKEN] = data[DATA][TOKEN];
          const usuarioData = JSON.parse(
            atob(data[DATA][TOKEN].split('.')[1]));
          if (usuarioData[ROLE] === 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/funcionario']);
          }
        },
        err => {
          let msg = 'Tente novamente';
          const STATUS = 'status';
          if (err[STATUS] === 401) {
            msg = 'Email ou senha inválido(s)!';
          }
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
  }

}
