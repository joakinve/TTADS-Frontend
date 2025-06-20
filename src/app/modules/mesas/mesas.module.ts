import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MesasRoutingModule } from './mesas-routing.module'
import { MesasComponent } from './mesas.component'
import { ComponentsModule } from 'src/app/shared/modules/components/components.module'
import { MaterialModule } from 'src/app/shared/modules/material/material.module'


@NgModule({
  declarations: [MesasComponent],
  imports: [CommonModule, MesasRoutingModule, ComponentsModule, MaterialModule]
})
export class MesasModule {}
