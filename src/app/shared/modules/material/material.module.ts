import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Módulos de Angular Material
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'
import { MatTabsModule } from '@angular/material/tabs'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog'
import { MatRadioModule } from '@angular/material/radio'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatExpansionModule } from '@angular/material/expansion'

const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatTabsModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatSelectModule,
  MatDialogModule,
  MatRadioModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatMomentDateModule,
  MatExpansionModule
]
@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class MaterialModule {}
