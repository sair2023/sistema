import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { HistoriaVentasComponent } from './historia-ventas/historia-ventas.component';
import { DetalleVentaEmpresaComponent } from './detalle-venta-empresa/detalle-venta-empresa.component';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "venta",
    pathMatch: "full",
  },
  {
    path: "venta",
    component: VentasComponent,
  },
  {
    path: "historial_venta",
    component: HistoriaVentasComponent,
  },
  {
    path: "venta_empleado",
    component: DetalleVentaEmpresaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
