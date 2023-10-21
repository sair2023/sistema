import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { VentasRoutingModule } from './ventas-routing.module';
import { HistoriaVentasComponent } from './historia-ventas/historia-ventas.component';
import { ComponentsModule } from '../shared/components/components.module';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { DetalleVentaEmpresaComponent } from './detalle-venta-empresa/detalle-venta-empresa.component';

@NgModule({
  declarations: [
    HistoriaVentasComponent,
    DetalleVentaComponent,
    DetalleVentaEmpresaComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class VentasModule { }
