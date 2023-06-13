import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/conta/services/conta.service';
import { UsuarioLogin } from 'src/app/models/UsuarioLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors: any[] = [];
  loginForm!: FormGroup;
  usuarioLogin!: UsuarioLogin;

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  fazerLogin() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuarioLogin = Object.assign({}, this.usuarioLogin, this.loginForm.value);
      this.errors = [];

      this.contaService.loginUsuario(this.usuarioLogin)
      .subscribe(
        {
          next: next => {this.processarSucesso(next)},
          error: (error: Error) => {this.processarFalha(error)}
        }
      )
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.router.navigate(['/home']);
  }

  processarFalha(fail: any) {
    let msg = fail.error;
    if (fail.status === 0) {
      msg = fail.statusText;
    }
    this.errors.push(msg);
  }

}
