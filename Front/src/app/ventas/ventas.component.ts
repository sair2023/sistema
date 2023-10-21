import { Component } from '@angular/core';
import { VentasService } from '@core/service/ventas.service';
import { AuthService } from '@core/service/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent {
  // Propiedades para los campos del formulario

  fecha_venta: Date;
  cliente: string;
  numero_venta: string;
  cantidad: number;
  descripcion: string;
  precioUnitario: number;
  nombre_emple: '';
  // Array para almacenar productos
  productos: any[] = [];
  total: number = 0;
  public token;
constructor(
  private _ventaService: VentasService,
  private _authService: AuthService,
  private snackBar: MatSnackBar,
){
  this.token = this._authService.getToken();
  this.fecha_venta = new Date();
}


puedesAgregarProducto(): boolean {
  return !!this.cantidad && !!this.descripcion && !!this.precioUnitario;
}
  // Función para agregar un producto
  agregarProducto() {
    const subtotal = this.cantidad * this.precioUnitario;
    const nuevoProducto = {
      cantidad: this.cantidad,
      descripcion: this.descripcion,
      precioUnitario: this.precioUnitario,
      subtotal: subtotal,
      total: this.total += subtotal
    };
    this.productos.push(nuevoProducto);

    // Limpiar campos después de agregar el producto
    this.cantidad = null;
    this.descripcion = '';
    this.precioUnitario = null;
  }

eliminarProducto(index: number) {
  const producto = this.productos[index];
  this.total -= producto.subtotal;
  this.productos.splice(index, 1);
}

registrarVenta(ventaForm) {
  if (ventaForm.valid) {
  const ventaData = {
    productos: this.productos,
    numero_venta: this.numero_venta,
    cliente: this.cliente,
    subtotal: this.total,
    total: this.total, // total y subtotal son iguales en este caso, pero podrías ajustar la lógica aquí si es necesario
    fecha_venta: this.fecha_venta,
    nombre_emple: this.nombre_emple,
  };

  this._ventaService.registro_venta(ventaData, this.token).subscribe(
    respuesta => {
      console.log('Venta registrada correctamente:', respuesta);
      // Restablece el formulario después de registrar la venta si es necesario
      this.productos = [];
      this.cliente = '';
      this.numero_venta = '';
      this.total = 0;
      Swal.fire('Venta', 'la venta fue realizada con exito', 'success');
    },
    error => {
      console.error('Error al registrar la venta:', error);
      Swal.fire('Error', 'Hubo un error al registra la venta', 'error');
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


}