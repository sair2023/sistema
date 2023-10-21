import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  public url;
  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  registro_producto(data,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_producto',data,{headers:headers});
  }
  listar_producto(token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_producto/',{headers:headers});
  }
  eliminar_producto(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_producto/'+id,{headers:headers});
  }

  obtener_producto(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_producto/'+id,{headers:headers});
  }

  registro_compra(data,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_compra',data,{headers:headers});
  }

}
