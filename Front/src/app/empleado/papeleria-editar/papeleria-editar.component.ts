import { Component, OnInit,Inject } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import Swal from 'sweetalert2';
import { ExpedienteService } from '@core/service/expediente.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa MAT_DIALOG_DATA
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormBuilder
import { GLOBAL } from '@core/service/GLOBAL';

@Component({
  selector: 'app-papeleria-editar',
  templateUrl: './papeleria-editar.component.html',
  styleUrls: ['./papeleria-editar.component.scss']
})
export class PapeleriaEditarComponent implements OnInit {
  public token;
  public id;
  public idd;
  public expediente:any={};
  public expedienteForm: FormGroup; 
  public url;
  archivos: { penales?: File, dpi?: File, policiacos?: File } = {};
  constructor(
    private _expedienteService: ExpedienteService,
    private _authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, // Inyecta FormBuilder
  ){
    this.url = GLOBAL.url;
    console.log('ID del expediente recibido:', this.data.expeId);
    console.log('ID del empleado recibido:', this.data.empleadoId);
    this.token = this._authService.getToken();
    this.expedienteForm = this.formBuilder.group({
      fecha_creacion: ['',Validators.required],
      dpi: ['',Validators.required],
      penales: ['',Validators.required],
      policiacos: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.id = this.data.empleadoId;
    this.idd = this.data.expeId;
    this.obtenerExpedienteId(this.idd);
  }

//obtener expediente por ID
obtenerExpedienteId(expeId: any) {
  console.log('Obteniendo expediente por ID:', expeId);
  this._expedienteService.obtener_expediente(expeId, this.token).subscribe(
    response => {
      if (response.data) {
        this.expediente = response.data;
        // Llena el formulario con los datos del expediente usando patchValue
        this.expedienteForm.patchValue(this.expediente);
      }
    },
    error => {
      console.error('Error al obtener el cupon:', error);
    }
  );
}

onArchivoSeleccionado(event: any, tipo: string): void {
  const archivo = event.target.files[0];
  if (archivo) {
    this.archivos[tipo] = archivo;
  }
}


//actualizar datos empleado
actualizar(){
  const expedienteData = this.expedienteForm.value;
  console.log(expedienteData)
    // Llama al servicio para actualizar el empleado
    this._expedienteService.actualizar_expediente(this.id, expedienteData, this.archivos, this.token).subscribe(
      response => {
          Swal.fire({
          title: 'Se actualizó correctamente el expediente del Empleado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3a8f40',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
        console.log('Expediente actualizado con éxito:', response);
      },
      error => {
        Swal.fire({
          title: 'No se han actualizado los datos',
          icon: 'error',
          cancelButtonText: 'Cerrar',
          cancelButtonColor: '#e51212',
          showCancelButton: true,
          showConfirmButton: false,
        });
        console.error('Error al actualizar el expediente:', error);
      }
    );
  }


}
