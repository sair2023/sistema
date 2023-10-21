import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "tienda",
    pathMatch: "full",
  },
  {
    path: "tienda",
    component: TiendaComponent,
  },
  {
    path: "productos",
    component: ProductosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
