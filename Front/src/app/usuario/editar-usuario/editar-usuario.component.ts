import { Component, OnInit, Inject  } from '@angular/core';
import { UsuarioService } from "../../core/service/usuario.service";
import { EmpleadoService } from '@core/service/empleado.service';
import { AuthService } from '@core/service/auth.service'
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa MAT_DIALOG_DATA
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormBuilder

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  hide = true;
  public empleados: any[] = [];
  public token;
  public id;
  public usuario:any={};
  public usuarioForm: FormGroup; 

  constructor(
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    private _empleadoService: EmpleadoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder // Inyecta FormBuilder
  ){
    console.log('ID del usuario recibida:', this.data.usuarioId);
    this.token = this._authService.getToken();
    this.usuarioForm = this.formBuilder.group({
      empleadoId: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }
  

  ngOnInit(): void {
    this.obtener_datos_empleados();
    this.id = this.data.usuarioId;
    this.obtenerUsuarioPorId(this.id);
  }

//obtiene id del usuario
  obtenerUsuarioPorId(usuarioId: any) {
    console.log('Obteniendo usuario por ID:', usuarioId);
    this._usuarioService.obtener_usuario(usuarioId, this.token).subscribe(
      response => {
        if (response.data) {
          this.usuario = response.data;
          // Llena el formulario con los datos del cliente usando patchValue
          this.usuarioForm.patchValue(this.usuario);
        }
      },
      error => {
        console.error('Error al obtener el cliente:', error);
      }
    );
  }



//llamar los datos de mi coleccion empleados
obtener_datos_empleados(){
  this._empleadoService.listar_empleados(null,null,this.token).subscribe(
    response =>{
      this.empleados = response.data;
    }, error=>{
      console.log('Error al obtener datos',error)
    }
  );
}


//actualizar usuarios funcion
actualizar() {
  if (this.usuarioForm.valid) {
    // Obtén los datos del formulario
    const formData = this.usuarioForm.value;
    // Realiza la solicitud para actualizar el cliente con la ID
    this._usuarioService.actualizar_usuario(this.id, formData, this.token).subscribe(
      response => {
        Swal.fire({
          title: 'Se actualizó correctamente el usuario',
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
