import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { UsuarioLogin } from "src/app/models/UsuarioLogin";
import { Usuario } from "../../models/Usuario";

@Injectable()
export class ContaService {
  protected UrlServiceV1: string = "https://localhost:5001/api/Usuarios/";

  constructor(private http: HttpClient){ }

  registrarUsuario(usuario: Usuario) : Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let response = this.http
      .post<Usuario>(this.UrlServiceV1 + 'Nova-conta', usuario, { headers });

    return response;
  }

  loginUsuario(usuarioLogin: UsuarioLogin) : Observable<Usuario>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let response = this.http
      .get<Usuario>(`${this.UrlServiceV1}Login?nome=${usuarioLogin.usuario}&senha=${usuarioLogin.senha}`, {});

    return response;

  }
}
