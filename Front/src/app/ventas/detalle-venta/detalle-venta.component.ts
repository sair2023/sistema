import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa MAT_DIALOG_DATA
import { GLOBAL } from '@core/service/GLOBAL';
import { VentasService } from "@core/service/ventas.service";
import { AuthService } from '@core/service/auth.service';
import { UsuarioService } from "@core/service/usuario.service";
import { EmpleadoService } from '@core/service/empleado.service';
@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss']
})
export class DetalleVentaComponent implements OnInit {
  public token;
  public id;
  public idd;
  public ventas:any={};
  idUser: string;
  public usuarios:any={};
  public empleado:any={};
  constructor(
    private _authService: AuthService,
    private _ventaService: VentasService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _usuarioService: UsuarioService,
    private _empleadoService: EmpleadoService,
  ){
    console.log('ID del empleado recibido:', this.data.ventaId);
    console.log('ID del empleado recibido:', this.data.usuarioId);
    this.token = this._authService.getToken();
  }

ngOnInit(): void {
  this.id = this.data.ventaId;
  this.idd = this.data.usuarioId;
this.obtenerVentaId(this.id);
this.obtenerUsuarioPorId(this.idd);
}

//obtener venta por ID
obtenerVentaId(ventaId: any) {
  console.log('Obteniendo venta por ID:', ventaId);
  this._ventaService.obtener_venta(ventaId, this.token).subscribe(
    response => {
      if (response.data) {
        this.ventas = response.data;
        console.log(response)
      }
    },
    error => {
      console.error('Error al obtener el cupon:', error);
    }
  );
}

obtenerUsuarioPorId(usuarioId: any) {
  this._usuarioService.obtener_usuarios(usuarioId, this.token).subscribe(
    response => {
      if (response.data && response.data.empleadoId._id) {
        this.usuarios = response.data;
        const empleadoId = response.data.empleadoId._id;
        console.log('id empleado',empleadoId)
        console.log(response)
        // Llamada a la función para obtener el empleado usando empleadoId
        this._empleadoService.obtener_empleadoss(empleadoId, this.token).subscribe(
          empleadoResponse => {
            console.log(empleadoResponse)
            if (empleadoResponse.data) {
              this.empleado = empleadoResponse.data;
            }
          },
          error => {
            console.error('Error al obtener el empleado:', error);
          })
          
     } },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
}


}
