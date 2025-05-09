import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { UsuariosRoutingModule } from './usuarios-routing.module'
import { UsuariosComponent } from './usuarios.component'

import { ComponentsModule, MaterialModule } from '@pa/shared/modules'
import { PerfilComponent } from './views/perfil/perfil.component'
import { HReservasComponent } from './views/h-reservas/h-reservas.component'
import { MenuesComponent } from './views/menues/menues.component'
import { DialogEditarPerfilComponent } from './components/dialog-editar-perfil/dialog-editar-perfil.component'
import { DialogCambiarPasswordComponent } from './components/dialog-cambiar-password/dialog-cambiar-password.component'
import { MenuesdialogComponent } from './components/menuesdialog/menuesdialog.component'
import { CrearMenuDialogComponent } from './components/crear-menu-dialog/crear-menu-dialog.component'
import { HResumenesComponent } from './views/h-resumenes/h-resumenes.component'
import { PedidosDiaComponent } from './views/pedidos-dia/pedidos-dia.component'

const modules = [ComponentsModule, MaterialModule]

@NgModule({
  declarations: [
    UsuariosComponent,
    PerfilComponent,
    HReservasComponent,
    HResumenesComponent,
    MenuesComponent,
    PedidosDiaComponent,
    DialogEditarPerfilComponent,
    DialogCambiarPasswordComponent,
    MenuesdialogComponent,
    CrearMenuDialogComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    ...modules
  ]
})
export class UsuariosModule {}
