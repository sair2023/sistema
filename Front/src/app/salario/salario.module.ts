import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalarioRoutingModule } from './salario-routing.module';
import { HistorialAumentoComponent } from './historial-aumento/historial-aumento.component';


@NgModule({
  declarations: [
    HistorialAumentoComponent
  ],
  imports: [
    CommonModule,
    SalarioRoutingModule
  ]
})
export class SalarioModule { }
