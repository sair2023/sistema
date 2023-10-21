import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/service/auth.service'
import Swal from 'sweetalert2';
import { DepartamentoService } from '@core/service/departamento.service';

@Component({
  selector: 'app-crear-depa',
  templateUrl: './crear-depa.component.html',
  styleUrls: ['./crear-depa.component.scss']
})
export class CrearDepaComponent implements OnInit{
  public departamentos : any = {};
    public token;
    public empresaId;

   constructor(
    private _authService: AuthService,
    private _deparService: DepartamentoService
   )
   {
    this.token = this._authService.getToken();
   }
   
   ngOnInit(): void {}

   registro(registroForm){
    if(registroForm.valid){
      console.log(this.departamentos);
      this._deparService.registro_departamento(this.departamentos,this.token).subscribe(
        response => {
          console.log(response);
          Swal.fire({
            title: 'Se registro correctamente el departamento de trabajo',
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
          Swal.fire({
            title: 'Ya existe un departamento registrado con el mismo nombre.',
            icon: 'error',
            cancelButtonText: 'Cerrar',
            cancelButtonColor: '#e51212',
            showCancelButton: true,
            showConfirmButton: false,
          })
          console.log(error);
        }

      )

    }else{
      Swal.fire({
        title: 'Formulario vacio',
        icon: 'error',
        cancelButtonText: 'Cerrar',
        cancelButtonColor: '#e51212',
        showCancelButton: true,
        showConfirmButton: false,
      })

    }
  }


}
