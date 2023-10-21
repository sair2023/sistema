import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from "@core/service/auth.service";
import { VentasService } from "@core/service/ventas.service";
import { MatDialog } from "@angular/material/dialog";
import { DetalleVentaComponent } from '../detalle-venta/detalle-venta.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-ventas',
  templateUrl: './historia-ventas.component.html',
  styleUrls: ['./historia-ventas.component.scss']
})
export class HistoriaVentasComponent implements OnInit {
  public ventas: Array<any> = [];
  public filtrado = '';
  public token;
  public rowHeight = 10; 
  public usuarioId;
  dataSource = new MatTableDataSource<any>(this.ventas); 
  columnas: string[] = ['No','cliente','fecha_venta','total','acciones'];
  //TITULOS de las tablas
  titulosColumnas: { [key: string]: string } = {
    'No': 'No.',
    'cliente': 'Nombre del Cliente',
    'fecha_venta': 'Fecha de Venta',
    'total': 'Total de Venta',
    'acciones': 'Acciones'
  };

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; // Obtener referencia al paginador

  constructor(
    private matDialog:MatDialog,
    private _authService: AuthService,
    private _ventaService: VentasService,
  ){
    this.token = this._authService.getToken();
    this.usuarioId = localStorage.getItem('_id') || '';
  }

  ngOnInit(): void {
    this.obtener_venta();
  }

  obtener_venta(){
    this._ventaService.listar_venta(this.usuarioId,'',this.token).subscribe(
      response => {
        console.log(response)
        this.ventas = response.data;
        this.ventas = this.ventas.map((venta, index) => {
          return { ...venta, No: index + 1 };
        });
        this.dataSource = new MatTableDataSource(this.ventas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
  
//buscar empleado 
filtro() {
  if (this.filtrado) {
    this._ventaService.listar_venta(this.usuarioId,this.filtrado,this.token).subscribe(
      response => {
        this.ventas = response.data;
        this.ventas = this.ventas.map((venta, index) => {
          return { ...venta, No: index + 1 };
        });
        this.dataSource = new MatTableDataSource(this.ventas);
        this.dataSource.paginator = this.paginator;
      }
    );
    this._ventaService.listar_venta(this.usuarioId,this.filtrado,this.token).subscribe(
      response => {
        this.ventas = response.data;
        this.ventas = this.ventas.map((venta, index) => {
          return { ...venta, No: index + 1 };
        });
        this.dataSource = new MatTableDataSource(this.ventas);
        this.dataSource.paginator = this.paginator;
      }
    );
  }   else {
    this.obtener_venta();
}
}

//detalle de venta
Detalle(ventaId: any, usuarioId: any) {
  // Abre el diálogo modal con el cliente seleccionado
  this.matDialog.open(DetalleVentaComponent, {
    data: { ventaId, usuarioId },
  });
}

//eliminar venta
eliminarEmpleado(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la Venta. ¿Esta seguro de que deseas continuar?',
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
        const response = await this._ventaService.eliminar_venta(id, this.token).toPromise();
        console.log('Venta eliminada con éxito:', response);
        Swal.fire('Venta eliminada', 'La Venta ha sido eliminada con éxito', 'success').then(() => {
          // Recarga la página después de cerrar el cuadro de diálogo de éxito
          location.reload();
        });
      } catch (error) {
        Swal.fire('Error', 'Ha ocurrido un error al tratar de eliminar la venta', 'error');
        console.error('Error al eliminar la venta:', error);
      }
    }
  });
}

}
