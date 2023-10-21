import { Component, OnInit, ViewChild  } from '@angular/core';
import { UsuarioService } from "../core/service/usuario.service";
import { AuthService } from "../core/service/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { CrearUsuarioComponent } from "./crear-usuario/crear-usuario.component";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
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
  private matDialog:MatDialog,
  private _authService: AuthService,
  private _usuarioService: UsuarioService,
){
  this.token = this._authService.getToken();
}

ngOnInit(): void {
  this.obtener_datos();
}
//modal de editar usuario
editDialog(usuarioId: any){
  this.matDialog.open(EditarUsuarioComponent,{
    data: {usuarioId}
  })
}


//modal de crear usuario
openDialog(){
  this.matDialog.open(CrearUsuarioComponent,{
  })
}

obtener_datos() {
  this._usuarioService.listar_usuarios(null, null, this.token).subscribe(
    (response: any) => {
      // Verificar si response.data es un array antes de usar el método filter
      if (Array.isArray(response.data)) {
        // Filtrar los usuarios deshabilitados
        this.usuarios = response.data.filter(usuario => usuario.status !== 'DESABILITADO');
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
          this.usuarios = response.data.filter(usuario => usuario.status !== 'DESABILITADO');
           
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
          this.usuarios = response.data.filter(usuario => usuario.status !== 'DESABILITADO');
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

//metodo para eliminar usuario
eliminarUsuario(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el Usuario. ¿Estás seguro de que deseas continuar?',
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
        const response = await this._usuarioService.eliminar_usuario(id, this.token).toPromise();
        console.log('Usuario eliminado con éxito:', response);
        Swal.fire('Usuario eliminado', 'El Usuario ha sido eliminado con éxito', 'success').then(() => {
          // Recarga la página después de cerrar el cuadro de diálogo de éxito
          location.reload();
        });
      } catch (error) {
        console.error('Error al eliminar el Usuario:', error);

        Swal.fire('Error', 'El usuario esta siendo utilizado', 'error');
      }
    }
  });
}

//metodo para desabilitar usuarios
deshabilitarUsuariosSeleccionados() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción deshabilitará los usuarios seleccionados. ¿Estás seguro de que deseas continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, deshabilitar',
    confirmButtonColor: '#3a8f40',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#FF0000',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const idsSeleccionados = this.selection.selected.map(usuario => usuario._id);
      // Llama al servicio para deshabilitar usuarios
      this._usuarioService.desabilitar_usuario(idsSeleccionados, this.token).subscribe(
        (response) => {
          // Maneja la respuesta del servicio
          console.log('Usuarios deshabilitados correctamente:', response);
          Swal.fire('Usuarios Deshabilitados', 'Los usuarios han sido deshabilitados correctamente.', 'success').then(() => {
            // Recarga la página después de cerrar el cuadro de diálogo de éxito
            location.reload()});
        },
        (error) => {
          // Maneja errores del servicio aquí
          console.error('Error al deshabilitar usuarios:', error);
          Swal.fire('Error', 'Ha ocurrido un error al deshabilitar los usuarios.', 'error');
        }
      )
 } })

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



}
