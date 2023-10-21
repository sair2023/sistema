import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from '@shared';
import { EmpresaComponent } from './empresa/empresa.component';
@NgModule({
  declarations: [
    EditarEmpleadoComponent,
    EditarUsuarioComponent,
    EmpresaComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    ComponentsModule,
    PdfViewerModule,
    CKEditorModule,
    SharedModule
  ]
})
export class CuentaModule { }
