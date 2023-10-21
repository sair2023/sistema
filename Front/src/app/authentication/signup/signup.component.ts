import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../core/service/empresa.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
public empresa : any = {}
hide = true;
  constructor(
   private _empresaService:EmpresaService
  ) {

  }
  ngOnInit() {
    
  }

  registro(registroForm) {
    if (registroForm.valid) {
      console.log(this.empresa);
      this._empresaService.registro_empresa(this.empresa).subscribe(
        (response:any) => {
          if (response.duplicate ) {
            Swal.fire({
              title: 'Error',
              titleText: response.message,
              text: 'Si tiene alguna duda por favor comuníquese con nosotros al correo sair.ayestas@gmail.com',
              icon: 'error',
              cancelButtonText: 'Cerrar',
              cancelButtonColor: '#e51212',
              showCancelButton: true,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              title: 'Se registró correctamente la empresa',
              text: 'Se le envió un correo electrónico para verificar su empresa',
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
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        title: 'Por favor ingrese todos sus datos',
        icon: 'error',
        cancelButtonText: 'Cerrar',
        cancelButtonColor: '#e51212',
        showCancelButton: true,
        showConfirmButton: false,
      });
    }
  }
  
}
