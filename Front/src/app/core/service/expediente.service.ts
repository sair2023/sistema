import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  public url;
  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  registro_expediente(data, archivos, token):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token});
    const formData = new FormData();
    formData.append('fecha_creacion',data.fecha_creacion);
    formData.append('empleadoId',data.empleadoId);
    formData.append('penales',archivos.penales);
    formData.append('policiacos',archivos.policiacos);
    formData.append('dpi',archivos.dpi);
    return this._http.post(this.url+'registro_expediente',formData,{headers:headers});
  }

  listar_expediente(empleadoId,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_expediente/'+empleadoId,{headers:headers});
  }

  actualizar_expediente(id,data, archivos, token):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token});
    const formData = new FormData();
    formData.append('fecha_creacion',data.fecha_creacion);
    formData.append('empleadoId',data.empleadoId);
    formData.append('penales',archivos.penales);
    formData.append('policiacos',archivos.policiacos);
    formData.append('dpi',archivos.dpi);
    return this._http.put(this.url+'editar_expediente/'+id,formData,{headers:headers});
  }

  obtener_expediente(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_expediente/'+id,{headers:headers});
  }

}
