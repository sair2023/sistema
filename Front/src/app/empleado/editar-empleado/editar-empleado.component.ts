import { Component, OnInit, Inject } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { DepartamentoService } from '@core/service/departamento.service';
import { AuthService } from '@core/service/auth.service';
import { EmpleadoService } from '@core/service/empleado.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa MAT_DIALOG_DATA
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormBuilder
import { GLOBAL } from '@core/service/GLOBAL';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.scss'],
})
export class EditarEmpleadoComponent implements OnInit {
  public Editor = ClassicEditor;
  public file: File; // Variable para la nueva foto
  public imgSelect : any | ArrayBuffer;
  public departamentos: any[] = [];
  public token;
  public id;
  public empleados:any={};
  public empleadoForm: FormGroup; 
  public url;

  constructor(
    private _authService: AuthService,
    private _empleadoService: EmpleadoService,
    private _departamentoService: DepartamentoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, // Inyecta FormBuilder
  ) {
    this.url = GLOBAL.url;
   console.log('ID del empleado recibido:', this.data.empleId);
    this.token = this._authService.getToken();
    this.empleadoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      civil: ['', Validators.required],
      tiene_hijos: ['', Validators.required],
      pareja: ['', Validators.required],
      num_hijos: ['', Validators.required],
      nom_hijos: ['', Validators.required],
      fecha_contra: ['', Validators.required],
      nit: ['', Validators.required],
      dpi: ['', Validators.required],
      salario_base: ['', Validators.required],
      deparId: ['', Validators.required],
      foto: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.data.empleId;
    this.obtenerEmpleadoId(this.id);
    this.obtener_datosDepa();
  }

//obtener empleado por ID
obtenerEmpleadoId(empleId: any) {
  console.log('Obteniendo empleado por ID:', empleId);
  this._empleadoService.obtener_empleados(empleId, this.token).subscribe(
    response => {
      if (response.data) {
        this.empleados = response.data;
        // Llena el formulario con los datos del cliente usando patchValue
        this.empleadoForm.patchValue(this.empleados);
        this.imgSelect = this.url +'obtener_foto/'+this.empleados.foto;
      }
    },
    error => {
      console.error('Error al obtener el cupon:', error);
    }
  );
}

  //EVENTO PARA CARGAR LA IMAGEN
  CargarImagen(event: any): void {
    var file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
    } else {
      // Manejo del caso en el que no se selecciona un archivo
      return;
    }

    // Verificaciones de tamaño y formato
    if (file.size <= 4000000) {
      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/jpeg'){
        //OBTENER IMAGEN EN BASE64
       const reader = new FileReader();
       reader.onload = e => this.imgSelect = reader.result;
       console.log(this.imgSelect);
       reader.readAsDataURL(file);
       this.file = file;

     }
      this.file = file; // Asigna el archivo a la propiedad file de tu componente
      this.empleadoForm.patchValue({ foto: file }); // Asigna el archivo al control foto del formulario
    } else {
      // Manejo del caso en el que el archivo no cumple con las validaciones
      return;
    }
  
  }

//actualizar datos empleado
actualizar(){
  const empleadoData = this.empleadoForm.value;
    // Obtén la nueva foto del formulario
  const foto: File = this.empleadoForm.get('foto').value;
  console.log(empleadoData)
    // Llama al servicio para actualizar el empleado
    this._empleadoService.actualizar_empleado(this.id, empleadoData, foto, this.token).subscribe(
      response => {
          Swal.fire({
          title: 'Se actualizó correctamente los datos del empleado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3a8f40',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
        console.log('Empleado actualizado con éxito:', response);
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
        console.error('Error al actualizar el empleado:', error);
      }
    );
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
}
