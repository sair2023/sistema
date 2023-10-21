import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  public url;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   registro_venta(data,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'venta_empleado',data,{headers:headers});
  }

  listar_venta(usuarioId,filtro?,token?):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    let params = new HttpParams();
    if (filtro) {
      params = params.set('cliente', filtro);
    }
    return this._http.get(this.url+'ventas_empleado/'+usuarioId,{headers:headers, params: params});
  }

  obtener_venta(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_venta/'+id,{headers:headers});
  }

  eliminar_venta(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_venta/'+id,{headers:headers});
  }

  listar_ventas(token, fechaInicio: string, fechaFin: string):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    // Construir los parámetros de consulta
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this._http.get(this.url+'listar_ventas',{headers:headers,  params: params });
  }

}
