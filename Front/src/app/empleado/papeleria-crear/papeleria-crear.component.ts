import { Component, OnInit,Inject } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import Swal from 'sweetalert2';
import { ExpedienteService } from '@core/service/expediente.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa MAT_DIALOG_DATA
import { EmpleadoService } from '@core/service/empleado.service';
@Component({
  selector: 'app-papeleria-crear',
  templateUrl: './papeleria-crear.component.html',
  styleUrls: ['./papeleria-crear.component.scss']
})
export class PapeleriaCrearComponent implements OnInit {
  public expedientes : any = {};
  public token;
  public nombreEmpleado: string; 
  public apellidoEmpleado: string; 
  public id;
  archivos: { penales?: File, dpi?: File, policiacos?: File } = {};
constructor(
  private _expedienteService: ExpedienteService,
  private _authService: AuthService,
  private _empleadoService: EmpleadoService,
  @Inject(MAT_DIALOG_DATA) public data: any,
){
  console.log('ID del empleado recibido:', this.data.empleId);
  this.token = this._authService.getToken();
}


ngOnInit(): void {
  this.id = this.data.empleId;
  this.obtenerEmpleadoId(this.id);
}


//registrar expediente
registro(registroForm){
  if(registroForm.valid){
    this.expedientes.empleadoId = this.id;
    console.log(this.expedientes);
    console.log(this.archivos);
    this._expedienteService.registro_expediente(this.expedientes,this.archivos,this.token).subscribe(
      response => {
        Swal.fire({
          title: 'Se registro correctamente el expediente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3a8f40',
        }).then((result) => {
          if (result.isConfirmed) {
            // Recargar la página después de que el usuario haga clic en Aceptar
            location.reload();
          }
        });
        console.log(response);
      },
      error=>{
        Swal.fire('Error', 'El Empleado ya tiene un expediente', 'error');
        console.log(error);
      }
    )

  }else{
    Swal.fire({
      title: 'No se han guardado los datos correctamente',
      icon: 'error',
      cancelButtonText: 'Cerrar',
      cancelButtonColor: '#e51212',
      showCancelButton: true,
      showConfirmButton: false,
    });
  }
}

onArchivoSeleccionado(event: any, tipo: string): void {
  const archivo = event.target.files[0];
  if (archivo) {
    this.archivos[tipo] = archivo;
  }
}

//obtener empleado por ID
obtenerEmpleadoId(empleId: any) {
  console.log('Obteniendo empleado por ID:', empleId);
  this._empleadoService.obtener_empleados(empleId, this.token).subscribe(
    response => {
      if (response.data) {
        this.nombreEmpleado = response.data.nombre;
        this.apellidoEmpleado = response.data.apellido;
      }
    },
    error => {
      console.error('Error al obtener el cupon:', error);
    }
  );
}

}
