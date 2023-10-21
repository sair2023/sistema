import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { SharedModule } from '@shared';
import { ComponentsModule } from '../shared/components/components.module';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { UsuarioDesabilitadoComponent } from './usuario-desabilitado/usuario-desabilitado.component';





@NgModule({
  declarations: [
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    UsuarioDesabilitadoComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class UsuarioModule { }
