import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  public url;
  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }
  registro_empresa(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'registro-empresa',data,{headers:headers})
  }

  obtener_empresa(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_empresa/'+id,{headers:headers});
  }

  actualizar_empresa(id,data, file, token):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token});
    const formData = new FormData();
    formData.append('nombre',data.nombre);
    formData.append('telefono',data.telefono);
    formData.append('direccion',data.direccion);
    formData.append('nit',data.nit);
    formData.append('correo',data.correo);
    formData.append('password',data.password);
    formData.append('logo',file);
   
    return this._http.put(this.url+'actualizar_empresa/'+id,formData,{headers:headers});
  }

  datos_usuario(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'usuarios_datos/'+id,{headers:headers});
  }

  datos_emleado(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'empleado_datos/'+id,{headers:headers});
  }

}
