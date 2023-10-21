import { Component, OnInit, ViewChild  } from '@angular/core';
import { AuthService } from "@core/service/auth.service";
import { TiendaService } from "@core/service/tienda.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import { GLOBAL } from '@core/service/GLOBAL';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public url;
  public productos: Array<any> = [];
  public filtrado = '';
  public token;
  public rowHeight = 10; 
  codigo: string;
  titulo: string;
  precio: number;
  dataSource = new MatTableDataSource<any>(this.productos); 
  //datos de la tabla
  columnas: string[] = ['No','codigo', 'titulo','precio','acciones'];
  //TITULOS de las tablas
  titulosColumnas: { [key: string]: string } = {
    'No': 'No.',
    'codigo': 'Codigo Producto',
    'titulo': 'Descripcion del Producto',
    'precio': 'Precio del Producto',
    'acciones': 'Acciones'
  };
  // ordenar tabla en asecendte y descen
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; // Obtener referencia al paginador

  constructor(
    private matDialog:MatDialog,
    private _authService: AuthService,
    private _tiendaService: TiendaService,
  ){
    this.token = this._authService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit(): void {
    this.obtener_datos();
  }

//obtenemos los datos de la coleccion empleados
  obtener_datos(){
    this._tiendaService.listar_producto(this.token).subscribe(
      response =>{
        console.log('datos obtenidos',response)
        this.productos = response;
        this.productos = this.productos.map((producto, index) => {
          return { ...producto, No: index + 1 };
        });
        this.dataSource = new MatTableDataSource(this.productos);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
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
    text: 'Esta acción eliminará el Producto. ¿Estás seguro de que deseas continuar?',
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
        const response = await this._tiendaService.eliminar_producto(id, this.token).toPromise();
        console.log('Producto eliminado con éxito:', response);
        // Aquí puedes mostrar una notificación de éxito utilizando SweetAlert2
        Swal.fire('Producto eliminado', 'El Producto ha sido eliminado con éxito', 'success').then(() => {
          // Recarga la página después de cerrar el cuadro de diálogo de éxito
          location.reload();
        });
      } catch (error) {
        console.error('Error al eliminar el Producto:', error);

        Swal.fire('Error', 'El Producto esta siendo utilizado en tienda', 'error');
      }
    }
  });
}

registrarProducto(producto) {
  if (producto.valid) {
  const produData = {
    codigo: this.codigo,
    titulo: this.titulo,
    precio: this.precio,
  };

  this._tiendaService.registro_producto(produData, this.token).subscribe(
    respuesta => {
      console.log('Producto registrada correctamente:', respuesta);
      // Restablece el formulario después de registrar la Producto si es necesario
      this.codigo = '';
      this.titulo = '';
      this.precio = 0;
      Swal.fire('Producto', 'El Producto fue realizada con exito', 'success').then(() => {
        // Recarga la página después de cerrar el cuadro de diálogo de éxito
        location.reload();
      });;
    },
    error => {
      console.error('Error al registrar el Producto:', error);
      Swal.fire('Error', 'Hubo un error al registra el Producto', 'error');
    }
  );
} else {
  // El formulario no es válido, muestra un mensaje de error o realiza alguna acción adicional
  Swal.fire('Error', 'Por favor, complete todos los campos requeridos', 'error');
}
}



}
