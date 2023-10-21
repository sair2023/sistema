import { Component, OnInit, ViewChild  } from '@angular/core';
import { UsuarioService } from "../../core/service/usuario.service";
import { AuthService } from "../../core/service/auth.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-usuario-desabilitado',
  templateUrl: './usuario-desabilitado.component.html',
  styleUrls: ['./usuario-desabilitado.component.scss']
})
export class UsuarioDesabilitadoComponent implements OnInit{
  public usuarios: Array<any> = [];
  public filtrado = '';
  public token;
  public rowHeight = 10; 
  //select en la tabla
  // Crear una instancia de SelectionModel para los usuarios seleccionados
  selection = new SelectionModel<any>(true, []);
  // Método para manejar la selección de usuarios
  toggleSeleccion(usuario: any) {
    this.selection.toggle(usuario); // Alternar la selección del usuario completo
  }
  
  toggleSeleccionGeneral() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.usuarios.forEach((usuario) => this.selection.select(usuario));
    }
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.usuarios.length;
    return numSelected === numRows;
  }
  
  dataSource = new MatTableDataSource<any>(this.usuarios); 
   //datos de la tabla
   columnas: string[] = ['seleccion','empleadoId', 'correo','rol', 'status','acciones'];
   //TITULOS de las tablas
   titulosColumnas: { [key: string]: string } = {
    'seleccion': '', 
     'empleadoId': 'Nombre del Usuario',
     'correo': 'Correo Electronico',
     'rol': 'Rol del Usuario',
     'status': 'Estado',
     'acciones': 'Acciones'
   };
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; // Obtener referencia al paginador
  constructor(
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
  ){
    this.token = this._authService.getToken();
  }
  
  ngOnInit(): void {
    this.obtener_datos();
  }

  obtener_datos() {
    this._usuarioService.listar_usuarios(null, null, this.token).subscribe(
      (response: any) => {
        // Verificar si response.data es un array antes de usar el método filter
        if (Array.isArray(response.data)) {
          // Filtrar los usuarios deshabilitados
          this.usuarios = response.data.filter(usuario => usuario.status === 'DESABILITADO');
          // Crear el MatTableDataSource con los usuarios filtrados
          this.dataSource = new MatTableDataSource(this.usuarios);
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
  
  filtro() {
    if (this.filtrado) {
      // Realiza la búsqueda tanto por nombre como por correo
      this._usuarioService.listar_usuarios('nombre', this.filtrado, this.token).subscribe(
        response => {
          if (Array.isArray(response.data)) {
            // Filtrar los usuarios deshabilitados
            this.usuarios = response.data.filter(usuario => usuario.status === 'DESABILITADO');
             
            // Crear el MatTableDataSource con los usuarios filtrados
            this.dataSource = new MatTableDataSource(this.usuarios);
            this.dataSource.paginator = this.paginator;
          } else {
            console.error('La propiedad data en la respuesta del servidor no es un array:', response);
          }
        },
        error => {
          console.log(error);
        }
      );
        //busqueda por correo electronico
      this._usuarioService.listar_usuarios('correo', this.filtrado, this.token).subscribe(
        response => {
          if (Array.isArray(response.data)) {
            // Filtrar los usuarios deshabilitados
            this.usuarios = response.data.filter(usuario => usuario.status === 'DESABILITADO');
            // Crear el MatTableDataSource con los usuarios filtrados
            this.dataSource = new MatTableDataSource(this.usuarios);
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
ActivarUsuario(id) {
  console.log(id);
  try {
    this._usuarioService.activar_usuario(id, this.token).subscribe(
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

//metodo para habilitar usuarios
habilitarUsuariosSeleccionados() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción habilitará los usuarios seleccionados. ¿Estás seguro de que deseas continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, habilitar',
    confirmButtonColor: '#3a8f40',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#FF0000',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const idsSeleccionados = this.selection.selected.map(usuario => usuario._id);
      // Llama al servicio para habilitar usuarios
      this._usuarioService.habilitar_usuario(idsSeleccionados, this.token).subscribe(
        (response) => {
          // Maneja la respuesta del servicio
          console.log('Usuarios habilitados correctamente:', response);
          Swal.fire('Usuarios habilitados', 'Los usuarios han sido habilitados correctamente.', 'success').then(() => {
            // Recarga la página después de cerrar el cuadro de diálogo de éxito
            location.reload()});
        },
        (error) => {
          // errores del servicio aquí
          console.error('Error al habilitar usuarios:', error);
          Swal.fire('Error', 'Ha ocurrido un error al habilitar los usuarios.', 'error');
        }
      )
 } })

}


}
