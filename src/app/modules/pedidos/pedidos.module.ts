import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PedidosRoutingModule } from './pedidos-routing.module'
import { PedidosComponent } from './pedidos.component'
import { ComponentsModule } from 'src/app/shared/modules/components/components.module'
import { MaterialModule } from 'src/app/shared/modules/material/material.module'


@NgModule({
  declarations: [PedidosComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class PedidosModule {}
