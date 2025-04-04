import { Component, OnInit } from '@angular/core'
import { TableColumn } from '@pa/shared/models'
import { map } from 'rxjs'
import { MesasService } from '@pa/mesas/services'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '@pa/shared/components'
import { MesasDialogComponent } from '../../components/mesas-dialog/mesas-dialog.component'
import { MesaTabla } from '@pa/mesas/models'
import { AdminDataDialog } from '../../models/adminDataDialog'

@Component({
  selector: 'pa-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {
  datosTabla: any = []
  columnasPC: TableColumn[] = []
  columnasCelu: TableColumn[] = []

  msgConfirmacion = {
    title: 'Confirmar eliminación de la mesa',
    msg: '¿Estás seguro de eliminar la mesa? Esta acción no se puede deshacer.'
  }

  constructor(private _mesaService: MesasService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarMesas()
  }

  cargarMesas() {
    // Obtengo los datos de la tabla mesas
    this._mesaService
      .getAllMesas()
      .pipe(
        map((res: any) => {
          this.datosTabla = Object.keys(res).map((m) => ({
            id_mesa: res[m].id_mesa,
            capacidad: res[m].capacidad,
            ubicacion: res[m].ubicacion,
            qr: res[m].qr
          }))
        })
      )
      .subscribe({
        error: (err: any) =>
          console.error(`Código de error ${err.status}: `, err.error.msg)
      })
    // Defino las columnas de la tabla mesas
    this.columnasPC = [
      { name: 'Nro.', dataKey: 'id_mesa' },
      { name: 'Capacidad', dataKey: 'capacidad' },
      { name: 'Ubicación', dataKey: 'ubicacion' },
      { name: 'Código QR', dataKey: 'qr', isImage: true },
      {
        name: ' ',
        dataKey: 'actionButtons',
        editButton: true,
        deleteButton: true
      }
    ]
    this.columnasCelu = [
      { name: 'Nro.', dataKey: 'id_mesa' },
      { name: 'Capacidad', dataKey: 'capacidad' },
      { name: 'Código QR', dataKey: 'qr', isImage: true },
      {
        name: ' ',
        dataKey: 'actionButtons',
        editButton: true,
        deleteButton: true
      }
    ]
  }

  onDelete(mesa: any) {
    this._mesaService.deleteMesa(mesa.id_mesa).subscribe({
      next: (res: any) => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '300 px',
          data: { title: 'Eliminar mesa', msg: res.msg }
        })
        dialogRef.afterClosed().subscribe(() => {
          window.location.href = '/admin/mesas'
        })
      },
      error: (err) => {
        this.dialog.open(DialogComponent, {
          width: '300 px',
          data: {
            title: 'Error',
            msg: err.error.msg
          }
        })
      }
    })
  }

  onEdit(mesa: any) {
    const dataDialog: AdminDataDialog<MesaTabla> = {
      editar: true,
      elemento: mesa
    }
    const dialogRef = this.dialog.open(MesasDialogComponent, {
      width: '900px',
      data: dataDialog
    })
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this._mesaService.updateMesa(mesa.id_mesa, resultado.data).subscribe({
          // next - error - complete
          next: (res: any) => {
            const dialogRef = this.dialog.open(DialogComponent, {
              width: '375px',
              autoFocus: true,
              data: { title: 'Editar mesa', msg: res.msg }
            })
            dialogRef.afterClosed().subscribe(() => {
              window.location.href = '/admin/mesas'
            })
          },
          error: (err) => {
            this.dialog.open(DialogComponent, {
              width: '300 px',
              data: {
                title: 'Error',
                msg: err.error.msg
              }
            })
          }
        })
      }
    })
  }

  onAdd() {
    const dataDialog: AdminDataDialog<MesaTabla> = {
      editar: false
    }
    const dialogRef = this.dialog.open(MesasDialogComponent, {
      width: '900px',
      data: dataDialog
    })
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this._mesaService.createMesa(resultado.data).subscribe({
          next: (res: any) => {
            const id_mesa = res.elemento.id_mesa
            // Generar el código QR
            this._mesaService
              .generarQR(id_mesa)
              .then((qrCode) => {
                if (id_mesa !== null) {
                  // Actualizar la mesa con el QR generado
                  this._mesaService
                    .updateMesa(id_mesa, { qr: qrCode })
                    .subscribe({
                      next: () => {
                        const dialogRef = this.dialog.open(DialogComponent, {
                          width: '375px',
                          autoFocus: true,
                          data: { title: 'Agregar mesa', msg: res.msg }
                        })
                        dialogRef.afterClosed().subscribe(() => {
                          window.location.href = '/admin/mesas'
                        })
                      },
                      error: () => {
                        this.dialog.open(DialogComponent, {
                          width: '300 px',
                          data: {
                            title: 'Error',
                            msg: 'Mesa creada correctamente, error al generar el código QR.'
                          }
                        })
                        dialogRef.afterClosed().subscribe(() => {
                          window.location.href = '/admin/mesas'
                        })
                      }
                    })
                }
              })
              .catch((error) => console.error('Error generando el QR:', error))
          },
          error: (err) => {
            this.dialog.open(DialogComponent, {
              width: '300 px',
              data: {
                title: 'Error',
                msg: err.error.msg
              }
            })
          }
        })
      }
    })
  }
}
