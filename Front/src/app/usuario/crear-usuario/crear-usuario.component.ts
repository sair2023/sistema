import { Component, OnInit  } from '@angular/core';
import { UsuarioService } from "../../core/service/usuario.service";
import { EmpleadoService } from '@core/service/empleado.service';
import { AuthService } from '@core/service/auth.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
  export class CrearUsuarioComponent implements OnInit{
    public empleados: any[] = [];
    hide = true;
    public usuarios : any = {};
    public token;
    public empresaId;
    constructor(
      private _authService: AuthService,
      private _usuarioService: UsuarioService,
      private _empleadoService: EmpleadoService,
    ){
      this.token = this._authService.getToken();
    }

    ngOnInit(): void {
      this.obtener_datos_empleados()
    }

    registro(registroForm){
      if(registroForm.valid){
        console.log(this.usuarios);
        this._usuarioService.registro_usuario(this.usuarios,this.token).subscribe(
          response => {
            console.log(response);
            Swal.fire({
              title: 'Se registro correctamente el Usuario',
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
            Swal.fire('Error', 'El Empleado ya tiene un usuario', 'error');
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
        })

      }
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
  }
