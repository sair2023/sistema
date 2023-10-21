import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../core/service/auth.service";
import { UsuarioService } from '@core/service/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit
{
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  public user : any = {};
  public usuario : any = {};
  public token : any = '';
  iniciarComoUsuario: boolean = false; // valor predeterminado para iniciar como empresa
  constructor(
    private router: Router,
    private admin: AuthService,
    private _usuarioService: UsuarioService
  ){
    this.token = this.admin.getToken();
  }

  ngOnInit() {
    console.log(this.token);
    if (this.token) {
      this.router.navigate(['/dashboard']);
    }else{
      //mantiene en el componente
    }
  }

  login(loginForm:any){
    this.error = '';
    if (loginForm.valid) {
      let data = {
        correo: this.user.correo,
        password: this.user.password,
        nit: this.user.nit
      }
      if (this.iniciarComoUsuario === false ) {
      this.admin.login_empresa(data).subscribe(
        response=>{
          console.log(response);
          if (response.data == undefined) {
            this.error = response.message;
            Swal.fire({ 
            icon: 'warning',
            title: 'Verifique',
            text: 'El Correo no se enonctro talvez intenta acceder como empresa, Haga click en Iniciar como usuario',
            confirmButtonColor: '#3a8f40 ',
            confirmButtonText: 'Entiendo'
          });
          }else{
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);
            localStorage.setItem('rol',response.data.rol);
            this.router.navigate(['/dashboard']);
            // Swal.fire('Bienvenido','', 'success').then(() => {
            //   // Recarga la página después de cerrar el cuadro de diálogo de éxito
            //   location.reload();
            // });


          }
        },
        error=>{
          console.log(error);
        }    
      );
      }if(this.iniciarComoUsuario === true ) {
        this._usuarioService.login_usuario(data).subscribe(
        response=>{
          console.log(response);
          if (response.data == undefined) {
            this.error = response.message;
            Swal.fire({ 
              icon: 'warning',  
              title: 'Verifique',
              text: 'El Correo no se enonctro talvez intenta acceder como usuario, Descliquee en Iniciar como usuario',
              confirmButtonColor: '#3a8f40 ',
              confirmButtonText: 'Entiendo'
            });
          }else{
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);
            localStorage.setItem('rol',response.data.rol);
            
            this.router.navigate(['/dashboard']);
            Swal.fire('Bienvenido', '', 'success').then(() => {
              // Recarga la página después de cerrar el cuadro de diálogo de éxito
              location.reload();
            });

          }
        },
        error=>{
          console.log(error);
        }    
      )}
    }else{
      this.error = 'Ingrese los datos correspondientes!';
    }
  }

  toggleIniciarComoUsuario(event: any): void {
    this.iniciarComoUsuario = event.checked;
    console.log(this.iniciarComoUsuario)
  }
}
