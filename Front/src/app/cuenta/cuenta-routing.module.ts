import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaComponent } from './cuenta.component';
import { EmpresaComponent } from './empresa/empresa.component';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "cuenta",
    pathMatch: "full",
  },
  {
    path: "cuenta",
    component: CuentaComponent,
  },
  {
    path: "empresa",
    component: EmpresaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
