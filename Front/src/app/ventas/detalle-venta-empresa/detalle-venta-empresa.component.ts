import { Component, OnInit, ViewChild } from '@angular/core';
import { VentasService } from "@core/service/ventas.service";
import { AuthService } from '@core/service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import { DetalleVentaComponent } from '../detalle-venta/detalle-venta.component';


@Component({
  selector: 'app-detalle-venta-empresa',
  templateUrl: './detalle-venta-empresa.component.html',
  styleUrls: ['./detalle-venta-empresa.component.scss']
})
export class DetalleVentaEmpresaComponent implements OnInit {
  

  public ventas: Array<any> = [];
  public filtrado = '';
  public token;
  public rowHeight = 10; 
  public idemple;
  public empleados:any={};
  fechaInicio: string;
  fechaFin: string;
  dataSource = new MatTableDataSource<any>(this.ventas); 
  columnas: string[] = ['No','usuarioId','cliente','fecha_venta','total','acciones'];
  //TITULOS de las tablas
  titulosColumnas: { [key: string]: string } = {
    'No': 'No.',
    'usuarioId': 'Usuario',
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

  }

  ngOnInit(): void {
    this.obtener_venta();

  }

  obtener_venta(){
    this._ventaService.listar_ventas(this.token, '','' ).subscribe(
      response => {
        this.ventas = response.data;
        console.log(this.ventas)
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
  if (this.fechaInicio && this.fechaFin){
    this._ventaService.listar_ventas(this.token,this.fechaInicio,this.fechaFin).subscribe(
      response => {
        this.ventas = response.data;
        this.ventas = this.ventas.map((venta, index) => {
          return { ...venta, No: index + 1 };
        });
        this.dataSource = new MatTableDataSource(this.ventas);
        this.dataSource.paginator = this.paginator;
      }
    )
  }   else {
    this.obtener_venta();
}
}

//detalle de venta
Detalle(ventaId: any, usuarioId:any) {
  // Abre el diálogo modal con el cliente seleccionado
  this.matDialog.open(DetalleVentaComponent, {
    data: { ventaId, usuarioId },
  });
}

  // Método para borrar la selección de fechas
  borrarFechasSeleccionadas() {
    this.fechaInicio = null;
    this.fechaFin = null;
    this.filtro();
  }


}
