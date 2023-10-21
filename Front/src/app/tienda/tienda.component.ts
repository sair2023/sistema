import { Component, OnInit} from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { EmpleadoService } from '@core/service/empleado.service';
import { TiendaService } from "@core/service/tienda.service";
import { UntypedFormControl } from "@angular/forms";
import { UsuarioService } from "../core/service/usuario.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  public token;
  public userId: string;
  public usuario: any = {};
  public empleados: any = {};
  public producto: any = [];
  fecha: Date;
  numero_venta: string;
  cantidad: number;
  productos: any[] = [];
  total: number = 0;
  productoSeleccionado: any = {};
  productoSeleccionadoId: string; 
  constructor(
    private _authService: AuthService,
    private _empleadoService: EmpleadoService,
    private _tiendaService: TiendaService ,
    private _usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ){
    this.token = this._authService.getToken();
    this.userId = localStorage.getItem('_id') || '';
    console.log(this.userId)
  }
  
  puedesAgregarProducto(): boolean {
    return !!this.cantidad;
  }

 // Función para agregar un producto
 agregarProducto() {
  if (this.productoSeleccionado && this.cantidad) {
    const subtotal = this.cantidad * this.productoSeleccionado.precio;
    const nuevoProducto = {
      productoId: this.productoSeleccionado._id,
      cantidad: this.cantidad,
      subtotal: subtotal
    };
    this.productos.push(nuevoProducto);
    this.total += subtotal;

    // Limpiar campos después de agregar el producto
    this.cantidad = null;
    this.productoSeleccionado = {};
  } else {
    // Manejar el caso cuando no se ha seleccionado un producto o no se ha ingresado una cantidad
  }
}

eliminarProducto(index: number) {
  const producto = this.productos[index];
  this.total -= producto.subtotal;
  this.productos.splice(index, 1);
}
seleccionarProducto() {
  this.productoSeleccionado = this.producto.find(prod => prod._id === this.productoSeleccionadoId);
}
registrarVenta(ventaForm) {
  if (ventaForm.valid) {
  const ventaData = {
    productos: this.productos,
    numero_venta: this.numero_venta,
    empleadoId: this.empleados._id,
    subtotal: this.total,
    total: this.total, // total y subtotal son iguales en este caso, pero podrías ajustar la lógica aquí si es necesario
    fecha: this.fecha,
  };

  this._tiendaService.registro_compra(ventaData, this.token).subscribe(
    respuesta => {
      console.log('Compra registrada correctamente:', respuesta);
      // Restablece el formulario después de registrar la venta si es necesario
      this.productos = [];
      this.numero_venta = '';
      this.total = 0;
      Swal.fire('Compra', 'la compra fue realizada con exito', 'success');
    },
    error => {
      console.error('Error al registrar la compra:', error);
      Swal.fire('Error', 'Hubo un error al registra la compra', 'error');
    }
  );
} else {
  // El formulario no es válido, muestra un mensaje de error o realiza alguna acción adicional
  Swal.fire('Error', 'Por favor, complete todos los campos requeridos', 'error');
}
}

//notificacion
showNotification(
  colorName: string,
  text: string,
  placementFrom: MatSnackBarVerticalPosition,
  placementAlign: MatSnackBarHorizontalPosition
) {
  this.snackBar.open(text, '', {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}



  ngOnInit(): void {
    this.token = localStorage.getItem('token'); // Obtén el token del localStorage o de donde sea que lo almacenes
    this.userId = localStorage.getItem('_id') || '';
    this.obtenerUsuarioPorId();
    this.obtenerDatos(); // Llama a la función para obtener los datos de los productos
  }

  obtenerUsuarioPorId() {
    this._usuarioService.obtener_usuarios(this.userId, this.token).subscribe(
      (response: any) => {
        if (response.data && response.data.empleadoId._id) {
          this.usuario = response.data;
          console.log(response.data)
          const empleadoId = response.data.empleadoId._id;
          this._empleadoService.obtener_empleadoss(empleadoId, this.token).subscribe(
            (empleadoResponse: any) => {
              if (empleadoResponse.data) {
                this.empleados = empleadoResponse.data;
                console.log(empleadoResponse)
              }
            },
            error => {
              console.error('Error al obtener el empleado:', error);
            }
          );
        }
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  obtenerDatos() {
    this._tiendaService.listar_producto(this.token).subscribe(
      (response: any) => {
        this.producto = response;
      },
      error => {
        console.log('Error al obtener datos', error);
      }
    );
  }

 


}



