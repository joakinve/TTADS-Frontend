import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { MesasDialogComponent } from '../../components/mesas-dialog/mesas-dialog.component'
import { AdminDataDialog } from '../../models/adminDataDialog'
import { BreakpointService } from '../../services/breakpoint.service'
import { TableColumn } from 'src/app/shared/models/tableColumn/tableColumn'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { MesaTabla } from 'src/app/modules/mesas/models/mesa'
import { MesasService } from 'src/app/modules/mesas/services/mesas.service'

@Component({
  selector: 'pa-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {
  datosTabla: any = []
  columnasPC: TableColumn[] = [
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
  columnasCelu: TableColumn[] = [
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
  msgConfirmacion = {
    title: 'Confirmar eliminación de la mesa',
    msg: '¿Estás seguro de eliminar la mesa? Esta acción no se puede deshacer.'
  }
  
  constructor(
    private _mesaService: MesasService, 
    public dialog: MatDialog,
    public breakpointService : BreakpointService){
    }

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
