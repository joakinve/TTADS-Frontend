import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

// Shared
import { MesaGridComponent } from '../../components/mesa-grid/mesa-grid.component'
import { QrScannerComponent } from '../../components/qr-scanner/qr-scanner.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MaterialModule } from '../material/material.module'
import { TablaComponent } from '../../components/tabla/tabla.component'
import { DialogComponent } from '../../components/dialog/dialog.component'
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component'

const components = [
  TablaComponent,
  DialogComponent,
  ConfirmDialogComponent,
  MesaGridComponent,
  QrScannerComponent
]

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule, MaterialModule, FontAwesomeModule],
  exports: [...components]
})
export class ComponentsModule {}
