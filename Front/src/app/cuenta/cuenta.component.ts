import { Component, OnInit} from '@angular/core';
import { UsuarioService } from "../core/service/usuario.service";
import { AuthService } from "../core/service/auth.service";
import { EmpleadoService } from '@core/service/empleado.service';
import { GLOBAL } from '@core/service/GLOBAL';
import { ExpedienteService } from '@core/service/expediente.service';
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PapeleriaEditarComponent } from 'app/empleado/papeleria-editar/papeleria-editar.component';
import { EditarEmpleadoComponent} from './editar-empleado/editar-empleado.component'
import {EditarUsuarioComponent} from './editar-usuario/editar-usuario.component'
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  public token;
  public  userId: string;
  public usuario:any={};
  public empleados:any={};
  public expediente:any={};
  public expedientes:any;
  public url;
  selectedTabIndex = 0;
  selected = new UntypedFormControl(0);
constructor(
  private _authService: AuthService,
  private _usuarioService: UsuarioService,
  private _empleadoService: EmpleadoService,
  private _expedienteService: ExpedienteService,
  private matDialog:MatDialog,
){
  this.url = GLOBAL.url;
  this.token = this._authService.getToken();
  this.userId = localStorage.getItem('_id') || '';
  console.log(this.userId)
}

ngOnInit(): void {
  this.obtenerUsuarioPorId(this.userId);
}

//obtiene id del usuario
obtenerUsuarioPorId(userId: any) {
  console.log('Obteniendo usuario por ID:', userId);
  this._usuarioService.obtener_usuarios(userId, this.token).subscribe(
    response => {
      if (response.data && response.data.empleadoId._id) {
        this.usuario = response.data;
        const empleadoId = response.data.empleadoId._id;
        console.log('id empleado',empleadoId)
        console.log(response)
        // Llamada a la función para obtener el empleado usando empleadoId
        this._empleadoService.obtener_empleadoss(empleadoId, this.token).subscribe(
          empleadoResponse => {
            console.log(empleadoResponse)
            if (empleadoResponse.data) {
              this.empleados = empleadoResponse.data;
            
            }
          },
          error => {
            console.error('Error al obtener el empleado:', error);
          }
        );
        this._expedienteService.obtener_expediente(empleadoId, this.token).subscribe(
          response => {
            if (response.data) {
              this.expediente = response.data;
            }
          },
          error => {
            console.error('Error al obtener el cupon:', error);
          }
        );
        this._expedienteService.listar_expediente(empleadoId, this.token).subscribe(
          response => {
            this.expedientes = response
            console.log(response)
            console.log(this.expedientes);
          },
          error =>{
            console.error('Error al obtener datos', error);
          }
        )
      }
    },
    error => {
      console.error('Error al obtener el usuario:', error);
    }
  );
}

//modal para actualizar expediente empleado
editarExpediente(empleadoId: any, expeId: any) {
  // Abre el diálogo modal con el cliente seleccionado
  this.matDialog.open(PapeleriaEditarComponent, {
    data: { empleadoId, expeId },
  });
}

//modal para actualizar empleado
openEdit(empleId: any) {
  // Abre el diálogo modal con el cliente seleccionado
  this.matDialog.open(EditarEmpleadoComponent, {
    data: { empleId },
  });
}

//modal de editar usuario
editDialog(usuarioId: any){
  this.matDialog.open(EditarUsuarioComponent,{
    data: {usuarioId}
  })
}


}
