import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { UsuarioDesabilitadoComponent } from './usuario-desabilitado/usuario-desabilitado.component';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "usuario",
    pathMatch: "full",
  },
  {
    path: "usuario",
    component: UsuarioComponent,
  },
  {
    path: "usuario_desabilitado",
    component: UsuarioDesabilitadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
