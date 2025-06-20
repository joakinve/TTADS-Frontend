import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CartaRoutingModule } from './carta-routing.module'
import { CartaComponent } from './carta.component'
import { CardTipoProductoComponent } from './components/card-tipo-producto/card-tipo-producto.component'

// Shared


import { ProductosComponent } from './views/productos/productos.component'
import { DialogDetalleProductoComponent } from './components/dialog-detalle-producto/dialog-detalle-producto.component'
import { DialogConfirmPedidoComponent } from './components/dialog-confirm-pedido/dialog-confirm-pedido.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ComponentsModule } from 'src/app/shared/modules/components/components.module'
import { MaterialModule } from 'src/app/shared/modules/material/material.module'

const modules = [ComponentsModule, MaterialModule, FontAwesomeModule]
@NgModule({
  declarations: [
    CartaComponent,
    CardTipoProductoComponent,
    ProductosComponent,
    DialogDetalleProductoComponent,
    DialogConfirmPedidoComponent
  ],
  imports: [CommonModule, CartaRoutingModule, ...modules]
})
export class CartaModule {}
