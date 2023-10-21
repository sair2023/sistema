import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalarioComponent } from './salario.component';
import { HistorialAumentoComponent } from './historial-aumento/historial-aumento.component';
const routes: Routes = [
  { 
    path: "",
    redirectTo: "salario",
    pathMatch: "full",
  },
  {
    path: "salario",
    component: SalarioComponent,
  },
  {
    path: "historial_salario",
    component: HistorialAumentoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalarioRoutingModule { }
