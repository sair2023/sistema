import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '@core/service/empleado.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DepartamentoService } from '@core/service/departamento.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss'],
})
export class CrearEmpleadoComponent implements OnInit {
  public empleados : any = {
    nom_hijos: 'No tiene',
    num_hijos: 0,
    pareja: 'No tiene'
  };
  public token;
  public empresaId;
  public departamentos: any[] = [];
  public Editor = ClassicEditor;
  //imagen variables
  public file : File = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/images/banner/1.png';

  constructor(
    private _authService: AuthService,
    private _empleadoService: EmpleadoService,
    private _departamentoService: DepartamentoService
  ) {
    this.token = this._authService.getToken();
   
  }
  ngOnInit(): void {
    this.obtener_datosDepa();
  }

  oncivil(){
    if (!this.empleados.civil === true) {
      this.empleados.pareja = '';
    }
  }
  offcivil(){
    if (!this.empleados.civil === false) {
      this.empleados.pareja = 'No tiene Pareja';
    }
  }
  onTieneHijosChange() {
    if (!this.empleados.tiene_hijos === true) {
      // Si empleados.tiene_hijos es false, reinicia los valores de los campos
      this.empleados.num_hijos = null; // O cualquier valor predeterminado para num_hijos
      this.empleados.nom_hijos = ''; // O cualquier valor predeterminado para nom_hijos
    }
  }
  offTieneHijosChange() {
    if (!this.empleados.tiene_hijos === false) {
      // Si empleados.tiene_hijos es false agrega valores
      this.empleados.num_hijos = 0; 
      this.empleados.nom_hijos = 'No tiene hijos'; 
    }
  }

  //obtenemos los datos de la coleccion empleados
  obtener_datosDepa() {
    this._departamentoService.listar_departamento(this.token).subscribe(
      (response) => {
        console.log('datos obtenidos', response);
        this.departamentos = response;
      },
      (error) => {
        console.log('Error al obtener datos', error);
      }
    );
  }
//registrar empleado
registro(registroForm){
  if(registroForm.valid){
    console.log(this.empleados);
    console.log(this.file);
    this._empleadoService.registro_empleado(this.empleados,this.file,this.token).subscribe(
      response => {
        Swal.fire({
          title: 'Se registro correctamente el empleado',
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
    $('#input-portada').text('Seleccionar imagen');
    this.imgSelect = 'assets/images/banner/1.png';
    this.file = undefined;
  }
}

   //EVENTO PARA CARGAR LA IMAGEN
  CargarImagen(event:any):void{
    var file;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];

    }else{
      Swal.fire({
        title: 'No se hay una imagen',
        icon: 'error',
        cancelButtonText: 'Cerrar',
        cancelButtonColor: '#e51212',
        showCancelButton: true,
        showConfirmButton: false,
      });

    }
    if(file.size <= 4000000){
      //Validacion de los formatos
      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/jpeg'){
         //OBTENER IMAGEN EN BASE64
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        // console.log(this.imgSelect);

        reader.readAsDataURL(file);
        // $('#input-portada').text(file.name);

        this.file = file;

      }else{
        Swal.fire({
          title: 'El formato de la imagen no es el permitido',
          icon: 'error',
          cancelButtonText: 'Cerrar',
          cancelButtonColor: '#e51212',
          showCancelButton: true,
          showConfirmButton: false,
        });
        this.imgSelect = 'assets/images/banner/1.png';
        this.file = undefined;
      }

    }
  }
}
