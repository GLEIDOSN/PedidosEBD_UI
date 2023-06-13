import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { ContaService } from 'src/app/conta/services/conta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit {

  errors: any[] = [];
  cadastroForm!: FormGroup;
  usuario!: Usuario;

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router) {

  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nomeUsuario: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
    });
  }

  adicionarConta() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.errors = [];

      this.contaService.registrarUsuario(this.usuario)
      .subscribe(
        {
          next: next => {this.processarSucesso(next)},
          error: (error: Error) => {this.processarFalha(error)}
        }
      )
    }
  }

  processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    this.router.navigate(['/home']);
  }

  processarFalha(fail: any) {
    let msg = fail.error;
    for (var i = 0; i < msg.length; i ++) {
      this.errors.push(msg[i]);
    }
  }
}
