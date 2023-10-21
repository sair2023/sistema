import { Component, OnInit} from '@angular/core';
import { AuthService } from "@core/service/auth.service";
import { GLOBAL } from '@core/service/GLOBAL';
import { EmpresaService } from "@core/service/empresa.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormBuilder
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  hide = true;
  public token;
  public url;
  public  empresaId: string;
  public empresa:any={};
  public usuario;
  public empleados;
  public empresaForm: FormGroup; 
  public file: File; // Variable para la nueva foto
  public imgSelect : any | ArrayBuffer;

  constructor(
    private _authService: AuthService,
    private _empresaService: EmpresaService,
    private formBuilder: FormBuilder, // Inyecta FormBuilder
  ){
    this.url = GLOBAL.url;
    this.token = this._authService.getToken();
    this.empresaId = localStorage.getItem('_id') || '';
    console.log(this.empresaId)
    this.empresaForm = this.formBuilder.group({
      nombre: ['',Validators.required],
      nit: ['',Validators.required],
      logo: ['',Validators.required],
      direccion: ['',Validators.required],
      correo: ['',Validators.required],
      password: ['',Validators.required],
      telefono: ['',Validators.required],
    })
  }

  ngOnInit(): void {
   this.obtenerEmpresaId(this.empresaId);
  }


//obtener empresa por ID
obtenerEmpresaId(empresaId: any) {
  console.log('Obteniendo expediente por ID:', empresaId);
  this._empresaService.obtener_empresa(empresaId, this.token).subscribe(
    response => {
      if (response.data) {
        this.empresa = response.data;
        console.log(response);
        // Llena el formulario con los datos del expediente usando patchValue
        this.empresaForm.patchValue(this.empresa);
        this.imgSelect = this.url +'obtener_logo/'+this.empresa.logo;
      }
    },
    error => {
      console.error('Error al obtener la empresa:', error);
    }
  );
  this._empresaService.datos_emleado(empresaId, this.token).subscribe(
    response => {
      if (response.data) {
        this.empleados = response.data.length;
        console.log(response);
      }
    },
    error => {
      console.error('Error al obtener la empresa:', error);
    }
  );
  this._empresaService.datos_usuario(empresaId, this.token).subscribe(
    response => {
      if (response.data) {
        this.usuario = response.data.length;
        console.log(response);
      }
    },
    error => {
      console.error('Error al obtener la empresa:', error);
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
      this.empresaForm.patchValue({ logo: file }); // Asigna el archivo al control foto del formulario
    } else {
      // Manejo del caso en el que el archivo no cumple con las validaciones
      return;
    }
  
  }

//actualizar usuarios funcion
actualizar() {
  if (this.empresaForm.valid) {
    // Obtén los datos del formulario
    const formData = this.empresaForm.value;
        // Obtén la nueva foto del formulario
  const logo: File = this.empresaForm.get('logo').value;
    // Realiza la solicitud para actualizar el cliente con la ID
    this._empresaService.actualizar_empresa(this.empresaId, formData, logo, this.token).subscribe(
      response => {
        Swal.fire({
          title: 'Se actualizó correctamente los datos de la empresa',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3a8f40',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
        console.log(response);
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'No se han actualizado los datos',
          icon: 'error',
          cancelButtonText: 'Cerrar',
          cancelButtonColor: '#e51212',
          showCancelButton: true,
          showConfirmButton: false,
        });
      }
    );
  } else {
    Swal.fire({
      title: 'No se han actualizado los datos',
      icon: 'error',
      cancelButtonText: 'Cerrar',
      cancelButtonColor: '#e51212',
      showCancelButton: true,
      showConfirmButton: false,
    });
    }
  }


}
