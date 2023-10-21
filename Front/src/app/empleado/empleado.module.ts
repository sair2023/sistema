import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { CrearDepaComponent } from './crear-depa/crear-depa.component';
import { MostrarDepaComponent } from './mostrar-depa/mostrar-depa.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { ComponentsModule } from '../shared/components/components.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EmpleadoDesabilitadoComponent } from './empleado-desabilitado/empleado-desabilitado.component';
import { PapeleriaEmpleadoComponent } from './papeleria-empleado/papeleria-empleado.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PapeleriaCrearComponent } from './papeleria-crear/papeleria-crear.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PapeleriaEditarComponent } from './papeleria-editar/papeleria-editar.component';
@NgModule({
  declarations: [
    CrearEmpleadoComponent,
    CrearDepaComponent,
    MostrarDepaComponent,
    EditarEmpleadoComponent,
    EmpleadoDesabilitadoComponent,
    PapeleriaEmpleadoComponent,
    PapeleriaCrearComponent,
    PapeleriaEditarComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    SharedModule,
    ComponentsModule,
    CKEditorModule,
    NgScrollbarModule,
    PdfViewerModule
  ]
})
export class EmpleadoModule { }
