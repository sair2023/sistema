import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  public url;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   registro_empleado(data, file, token):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token});
    const formData = new FormData();
    formData.append('nombre',data.nombre);
    formData.append('apellido',data.apellido);
    formData.append('telefono',data.telefono);
    formData.append('direccion',data.direccion);
    formData.append('civil',data.civil);
    formData.append('tiene_hijos',data.tiene_hijos);
    formData.append('pareja',data.pareja);
    formData.append('num_hijos',data.num_hijos);
    formData.append('nom_hijos',data.nom_hijos);
    formData.append('nit',data.nit);
    formData.append('dpi',data.dpi);
    formData.append('fecha_contra',data.fecha_contra);
    formData.append('salario_base',data.salario_base);
    formData.append('deparId',data.deparId);
    formData.append('foto',file);
    return this._http.post(this.url+'registro_empleado',formData,{headers:headers});
  }

  listar_empleados(tipo,filtro,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_empleados/'+tipo+'/'+filtro,{headers:headers});
  }

  eliminar_empleados(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_empleado/'+id,{headers:headers});
  }

  obtener_empleados(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_empleado/'+id,{headers:headers});
  }

  obtener_empleadoss(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_empleados/'+id,{headers:headers});
  }

  actualizar_empleado(id,data, file, token):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token});
    const formData = new FormData();
    formData.append('nombre',data.nombre);
    formData.append('apellido',data.apellido);
    formData.append('telefono',data.telefono);
    formData.append('direccion',data.direccion);
    formData.append('civil',data.civil);
    formData.append('tiene_hijos',data.tiene_hijos);
    formData.append('pareja',data.pareja);
    formData.append('num_hijos',data.num_hijos);
    formData.append('nom_hijos',data.nom_hijos);
    formData.append('nit',data.nit);
    formData.append('dpi',data.dpi);
    formData.append('fecha_contra',data.fecha_contra);
    formData.append('salario_base',data.salario_base);
    formData.append('deparId',data.deparId);
    formData.append('foto',file);
   
    return this._http.put(this.url+'actualizar_empleado/'+id,formData,{headers:headers});
  }

  desactivar_empleado(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'desactivar_empleado/'+id,{},{headers:headers});
  }

  activar_empleado(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'activar_empleado/'+id,{},{headers:headers});
  }


}
