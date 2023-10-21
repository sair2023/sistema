import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

  registro_usuario(data,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro-usuario',data,{headers:headers});
  }
  listar_usuarios(tipo,filtro,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_usuario/'+tipo+'/'+filtro,{headers:headers});
  }

  eliminar_usuario(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_usuario/'+id,{headers:headers});
  }

  desabilitar_usuario(ids,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'desabilitar_usuarios/'+ids,{},{headers:headers});
  }

  activar_usuario(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'activar_usuarios/'+id,{},{headers:headers});
  }

  habilitar_usuario(ids,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'habilitar_usuarios/'+ids,{},{headers:headers});
  }

  actualizar_usuario(id,data,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'editar_usuario/'+id,data,{headers:headers});
  }

  obtener_usuario(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_usuario/'+id,{headers:headers});
  }

  obtener_usuarios(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_usuarios/'+id,{headers:headers});
  }

  login_usuario(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login-usuario',data,{headers:headers})
  }
}
