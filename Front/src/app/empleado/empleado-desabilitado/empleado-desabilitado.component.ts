import { Component, OnInit, ViewChild  } from '@angular/core';
import { AuthService } from "../../core/service/auth.service";
import { EmpleadoService } from '@core/service/empleado.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import { GLOBAL } from '@core/service/GLOBAL';
import Swal from 'sweetalert2';
import { ExportarexcelService } from '@core/service/exportarexcel.service';

@Component({
  selector: 'app-empleado-desabilitado',
  templateUrl: './empleado-desabilitado.component.html',
  styleUrls: ['./empleado-desabilitado.component.scss']
})
export class EmpleadoDesabilitadoComponent implements OnInit {
  public url;
  public empleados: Array<any> = [];
  public filtrado = '';
  public token;
  public rowHeight = 10; 

  dataSource = new MatTableDataSource<any>(this.empleados); 
  //datos de la tabla
  columnas: string[] = ['No','nombre', 'apellido','fotografia', 'telefono','nit','deparId', 'status','acciones'];
  //TITULOS de las tablas
  titulosColumnas: { [key: string]: string } = {
    'No': 'No.',
    'nombre': 'Nombres',
    'apellido': 'Apellidos',
    'fotografia': 'Fotografia',
    'telefono': 'Telefono',
    'nit': 'NIT',
    'deparId': 'Departamento Trabajo',
    'status': 'Estado',
    'acciones': 'Acciones'
  };
  // ordenar tabla en asecendte y descen
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; // Obtener referencia al paginador


  constructor(
    private _authService: AuthService,
    private _empleadoService: EmpleadoService,
    private _excelService: ExportarexcelService
  ){
    this.token = this._authService.getToken();
    this.url = GLOBAL.url;
  }


  ngOnInit(): void {
    this.obtener_datos();
  }

//llamar los datos de mi coleccion empleados
obtener_datos() {
  this._empleadoService.listar_empleados(null, null, this.token).subscribe(
    (response: any) => {
      // Verificar si response.data es un array antes de usar el método filter
      if (Array.isArray(response.data)) {
        // Filtrar los empleados activos
        this.empleados = response.data.filter(empleado => empleado.status === 'DESABILITADO');
        // Mapear y agregar una propiedad de índice a cada empleado
        this.empleados = this.empleados.map((empleado, index) => {
          return { ...empleado, No: index + 1 };
        });
        // Crear el MatTableDataSource con los empleados filtrados
        this.dataSource = new MatTableDataSource(this.empleados);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        console.error('La propiedad data en la respuesta del servidor no es un array:', response);
      }
    },
    error => {
      console.error('Error al obtener datos', error);
    }
  );
}

//buscar empleado 
filtro() {
  if (this.filtrado) {
    // Realiza la búsqueda tanto por nombre como por apellido
    this._empleadoService.listar_empleados('nombre', this.filtrado, this.token).subscribe(
      response => {
        // Verificar si response.data es un array antes de usar el método filter
      if (Array.isArray(response.data)) {
        // Filtrar los empleados activos
        this.empleados = response.data.filter(empleado => empleado.status === 'DESABILITADO');
        // Mapear y agregar una propiedad de índice a cada empleado
        this.empleados = this.empleados.map((empleado, index) => {
          return { ...empleado, No: index + 1 };
        });
        // Crear el MatTableDataSource con los empleados filtrados
        this.dataSource = new MatTableDataSource(this.empleados);
        this.dataSource.paginator = this.paginator;
      } else {
        console.error('La propiedad data en la respuesta del servidor no es un array:', response);
      }
      },
      error => {
        console.log(error);
      }
    );

    this._empleadoService.listar_empleados('apellido', this.filtrado, this.token).subscribe(
      response => {
        // Verificar si response.data es un array antes de usar el método filter
        if (Array.isArray(response.data)) {
          // Filtrar los empleados activos
          this.empleados = response.data.filter(empleado => empleado.status === 'DESABILITADO');
          // Mapear y agregar una propiedad de índice a cada empleado
          this.empleados = this.empleados.map((empleado, index) => {
            return { ...empleado, No: index + 1 };
          });
          // Crear el MatTableDataSource con los empleados filtrados
          this.dataSource = new MatTableDataSource(this.empleados);
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('La propiedad data en la respuesta del servidor no es un array:', response);
        }
      },
      error => {
        console.log(error);
      }
    );
  } else {
    this.obtener_datos();
}
}

//metodo para activar usuario
Activar_Empleado(id) {
  console.log(id);
  try {
    this._empleadoService.activar_empleado(id, this.token).subscribe(
      response => {
        console.log('Usuario activado correctamente:', response);
        Swal.fire('Usuario Activado', 'El usuario ha sido activado correctamente.', 'success').then(() => {
          // Recarga la página después de cerrar el cuadro de diálogo de éxito
          location.reload()});;
      },
      error => {
        console.error('Error al activar el usuario:', error);
        Swal.fire('Error', 'Ha ocurrido un error al activar el usuario.', 'error');
      }
    );
  } catch (error) {
    console.error('Error inesperado:', error);
    // Manejar errores inesperados
    Swal.fire('Error', 'Ha ocurrido un error inesperado.', 'error');
  }
}



//exportar datos a excel

exportExcel() {
  // Filtrar empleados activos antes de exportar
  const empleadosActivos = this.empleados.filter(empleado => empleado.status === 'DESABILITADO');
  const datosExportar = empleadosActivos.map(empleado => {
    // Campos que quieres exportar
    return {
      Nombre: empleado.nombre,
      Apellido: empleado.apellido,
      Telefono: empleado.telefono,
      Direccion: empleado.direccion,
      DPI_Empleado: empleado.dpi,
      NIT_Empleado: empleado.nit,
      Departamento_Trabajo: empleado.deparId.titulo,
      Salario_Base: empleado.salario_base,
    };
  });
  
  this._excelService.exportExcel(datosExportar, 'Listado_Empleados');
}



}
