import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado.component';
import { EmpleadoDesabilitadoComponent } from './empleado-desabilitado/empleado-desabilitado.component';
import { PapeleriaEmpleadoComponent } from './papeleria-empleado/papeleria-empleado.component';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "empleado",
    pathMatch: "full",
  },
  {
    path: "empleado",
    component: EmpleadoComponent,
  },
  {
    path: "empleado_desabilitado",
    component: EmpleadoDesabilitadoComponent,
  },
  {
    path: "expediente",
    component: PapeleriaEmpleadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
