import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/service/auth.service";
import { EmpleadoService } from '@core/service/empleado.service';
import { GLOBAL } from '@core/service/GLOBAL';
import { MatDialog } from "@angular/material/dialog";
import { PapeleriaCrearComponent } from '../papeleria-crear/papeleria-crear.component';
import { ExpedienteService } from '@core/service/expediente.service';
import { UntypedFormControl } from "@angular/forms";
import { PapeleriaEditarComponent } from '../papeleria-editar/papeleria-editar.component';

@Component({
  selector: 'app-papeleria-empleado',
  templateUrl: './papeleria-empleado.component.html',
  styleUrls: ['./papeleria-empleado.component.scss']
})
export class PapeleriaEmpleadoComponent implements OnInit {
  public url;
  public empleados: Array<any> = [];
  public expediente: any;
  public filtrado = '';
  public token;
  public empleadoSeleccionado: any;
  mostrarImagen: boolean = true;
//configuracion para tabs
tabs = ["Dpi", "Antecedentes Penales", "Antecedentes Policiacos"];
selectedTabIndex = 0;
selected = new UntypedFormControl(0);
addTab(selectAfterAdding: boolean) {
  this.tabs.push("New");
  if (selectAfterAdding) {
    this.selected.setValue(this.tabs.length - 1);
  }
}
removeTab(index: number) {
  this.tabs.splice(index, 1);
}

constructor(
  private _authService: AuthService,
  private _empleadoService: EmpleadoService,
  private matDialog:MatDialog,
  private _expedienteService: ExpedienteService,
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
        this.empleados = response.data.filter(empleado => empleado.status === 'ACTIVO');
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

mostrarDetallesEmpleado = (empleadoId) =>  {
  console.log(empleadoId)
  this.empleadoSeleccionado = empleadoId;
  this._expedienteService.listar_expediente(this.empleadoSeleccionado, this.token).subscribe(
    response => {
      this.expediente = response
      console.log(response)
      console.log(this.expediente);
      this.mostrarImagen = false;
    },
    error =>{
      console.error('Error al obtener datos', error);
    }
  )
}

//modal para crear expediente empleado
openExpediente(empleId: any) {
  // Abre el diálogo modal con el cliente seleccionado
  this.matDialog.open(PapeleriaCrearComponent, {
    data: { empleId },
  });
}

//modal para actualizar expediente empleado
editarExpediente(empleadoId: any, expeId: any) {
  // Abre el diálogo modal con el cliente seleccionado
  this.matDialog.open(PapeleriaEditarComponent, {
    data: { empleadoId, expeId },
  });
}

}
