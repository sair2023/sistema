import { Component, OnInit, ViewChild  } from '@angular/core';
import { AuthService } from "../../core/service/auth.service";
import { DepartamentoService } from '@core/service/departamento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-depa',
  templateUrl: './mostrar-depa.component.html',
  styleUrls: ['./mostrar-depa.component.scss']
})
export class MostrarDepaComponent implements OnInit {
  public departamentos : any = {};
  public token;
  dataSource: MatTableDataSource<any>;
  columnas: string[] = ['titulo', 'acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  constructor(
    private _authService: AuthService,
    private _departamentoService: DepartamentoService
  ){
    this.token = this._authService.getToken();
  }
ngOnInit(): void {
  this.obtener_datos();
}
  //obtenemos los datos de la coleccion empleados
  obtener_datos(){
    this._departamentoService.listar_departamento(this.token).subscribe(
      response =>{
        console.log('datos obtenidos',response)
        this.departamentos = response;
        this.dataSource = new MatTableDataSource(this.departamentos);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
      }, error=>{
        console.log('Error al obtener datos',error)
      }
    );
  }
//eliminar departamento
eliminarDepa(id) {
  // Utiliza SweetAlert2 para mostrar un cuadro de diálogo de confirmación
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el Departamento. ¿Estás seguro de que deseas continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    confirmButtonColor: '#3a8f40',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#FF0000',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Si el usuario confirma la eliminación, realiza la solicitud DELETE usando async/await
        const response = await this._departamentoService.eliminar_departamento(id, this.token).toPromise();
        console.log('Departamento eliminado con éxito:', response);
        // Aquí puedes mostrar una notificación de éxito utilizando SweetAlert2
        Swal.fire('Departamento eliminado', 'El Departamento ha sido eliminado con éxito', 'success').then(() => {
          // Recarga la página después de cerrar el cuadro de diálogo de éxito
          location.reload();
        });
      } catch (error) {
        console.error('Error al eliminar el departamento:', error);

        Swal.fire('Error', 'El departamento esta siendo utilizado en un empleado', 'error');
      }
    }
  });
}


}
