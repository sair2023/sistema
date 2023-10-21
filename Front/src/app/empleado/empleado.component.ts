import { Component, OnInit, ViewChild  } from '@angular/core';
import { AuthService } from "../core/service/auth.service";
import { EmpleadoService } from '@core/service/empleado.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { CrearDepaComponent } from './crear-depa/crear-depa.component';
import { MostrarDepaComponent } from './mostrar-depa/mostrar-depa.component';
import { GLOBAL } from '@core/service/GLOBAL';
import Swal from 'sweetalert2';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { ExportarexcelService } from '@core/service/exportarexcel.service';



@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit  {
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
  private matDialog:MatDialog,
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
//modal para actualizar empleado
openEdit(empleId: any) {
  // Abre el diálogo modal con el cliente seleccionado
  this.matDialog.open(EditarEmpleadoComponent, {
    data: { empleId },
  });
}

//modal de crear empleado
openDialog(){
  this.matDialog.open(CrearEmpleadoComponent,{
  })
}
//modal de crear departamento
openDialogDepa(){
  this.matDialog.open(CrearDepaComponent,{
  })
}
//modal para mostrar departamentos
mostrarDepa(){
  this.matDialog.open(MostrarDepaComponent,{
  })
}

//llamar los datos de mi coleccion empleados
obtener_datos() {
  this._empleadoService.listar_empleados(null, null, this.token).subscribe(
    (response: any) => {
      // Verificar si response.data es un array antes de usar el método filter
      if (Array.isArray(response.data)) {
        // Filtrar los empleados activos
        this.empleados = response.data.filter(empleado => empleado.status === 'ACTIVO');
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
        this.empleados = response.data.filter(empleado => empleado.status === 'ACTIVO');
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
          this.empleados = response.data.filter(empleado => empleado.status === 'ACTIVO');
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

//eliminar Empleado
eliminarEmpleado(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el Empleado. ¿Estás seguro de que deseas continuar?',
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
        const response = await this._empleadoService.eliminar_empleados(id, this.token).toPromise();
        console.log('Empleado eliminado con éxito:', response);
        Swal.fire('Empleado eliminado', 'El Empleado ha sido eliminado con éxito', 'success').then(() => {
          // Recarga la página después de cerrar el cuadro de diálogo de éxito
          location.reload();
        });
      } catch (error) {
        Swal.fire('Error', 'El Empleado tiene un usuario Activo', 'error');
        console.error('Error al eliminar el empleado:', error);
      }
    }
  });
}

//exportar datos a excel

exportExcel() {
  // Filtrar empleados activos antes de exportar
  const empleadosActivos = this.empleados.filter(empleado => empleado.status === 'ACTIVO');
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


//generar PDF



//metodo para activar usuario
Desactivar_Empleado(id) {
  console.log(id);
  try {
    this._empleadoService.desactivar_empleado(id, this.token).subscribe(
      response => {
        console.log('Empleado desactivado correctamente:', response);
        Swal.fire('Empleado desactivado', 'El Empleado ha sido desactivado correctamente.', 'success').then(() => {
          // Recarga la página después de cerrar el cuadro de diálogo de éxito
          location.reload()});;
      },
      error => {
        console.error('Error al desactivar el Empleado:', error);
        Swal.fire('Error', 'Ha ocurrido un error al desactivar el Empleado.', 'error');
      }
    );
  } catch (error) {
    console.error('Error inesperado:', error);
    // Manejar errores inesperados
    Swal.fire('Error', 'Ha ocurrido un error inesperado.', 'error');
  }
}

}
