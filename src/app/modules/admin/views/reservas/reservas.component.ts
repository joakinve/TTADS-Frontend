import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import 'moment/locale/es'

import { map, Observable } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { BreakpointService } from '../../services/breakpoint.service'
import { ReservasService } from 'src/app/modules/reservas/services/reservas.service'
import { ReservaDataDialog } from '../../models/adminDataDialog'
import { ReservasDialogComponent } from '../../components/reservas-dialog/reservas-dialog.component'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { ReservaData, ReservaTabla } from 'src/app/modules/reservas/models/reserva'

@Component({
  selector: 'pa-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  datosTabla: ReservaTabla[] = [];
  isMobile!:boolean;
  msgConfirmacion = {
    title: 'Confirmar eliminación de la reserva',
    msg: '¿Estás seguro de eliminar la reserva? Esta acción no se puede deshacer.'
  }
  columnasPC = [
    { name: 'Nro.', dataKey: 'id_reserva' },
    { name: 'Fecha y hora', dataKey: 'fechaHora' },
    { name: 'Cantidad de personas', dataKey: 'cant_personas' },
    { name: '¿Está pendiente?', dataKey: 'pendiente' },
    { name: 'Usuario', dataKey: 'usuario' },
    { name: 'Mesa', dataKey: 'mesa' },
    {
      name: ' ',
      dataKey: 'actionButtons',
      editButton: true,
      deleteButton: true
    }
  ];
  columnasCelu = [
    { name: 'Fecha y hora', dataKey: 'fechaHora' },
    { name: 'Cantidad de personas', dataKey: 'cant_personas' },
    { name: 'Usuario', dataKey: 'usuario' },
    {
      name: ' ',
      dataKey: 'actionButtons',
      editButton: true,
      deleteButton: true
    }
  ];

  constructor(
    private _reservaService: ReservasService,
    public dialog: MatDialog,
    public breakpointService : BreakpointService
  ) {}

  ngOnInit(): void {
    this.cargarReservas()
  }

  cargarReservas() {
    // Obtengo los datos de la tabla Reservas
    this._reservaService
      .getAllReservas()
      .pipe(
        map((res: any) => {
          this.datosTabla = Object.keys(res).map((r) => ({
            id_reserva: res[r].id_reserva,
            fechaHora: moment(res[r].fechaHora).format('DD/MM/yyyy HH:mm'),
            cant_personas: res[r].cant_personas,
            isPendiente: res[r].isPendiente,
            pendiente: res[r].isPendiente?"Si":"No",
            id_usuario: res[r].Usuario.id_usuario,
            id_mesa: res[r].Mesa.id_mesa,
            usuario: res[r].Usuario.nombre + ' ' + res[r].Usuario.apellido,
            mesa: res[r].Mesa.id_mesa + ' - ' + res[r].Mesa.ubicacion
          }))
        })
      )
      .subscribe({
        error: (err) =>
          console.error(`Código de error ${err.status}: `, err.error.msg)
      })
    // // Defino las columnas de la tabla Reservas
    // this.columnasPC = [
    //   { name: 'Nro.', dataKey: 'id_reserva' },
    //   { name: 'Fecha y hora', dataKey: 'fechaHora' },
    //   { name: 'Cantidad de personas', dataKey: 'cant_personas' },
    //   { name: '¿Está pendiente?', dataKey: 'pendiente' },
    //   { name: 'Usuario', dataKey: 'usuario' },
    //   { name: 'Mesa', dataKey: 'mesa' },
    //   {
    //     name: ' ',
    //     dataKey: 'actionButtons',
    //     editButton: true,
    //     deleteButton: true
    //   }
    // ]
    // this.columnasCelu = [
    //   { name: 'Fecha y hora', dataKey: 'fechaHora' },
    //   { name: 'Cantidad de personas', dataKey: 'cant_personas' },
    //   { name: 'Usuario', dataKey: 'usuario' },
    //   {
    //     name: ' ',
    //     dataKey: 'actionButtons',
    //     editButton: true,
    //     deleteButton: true
    //   }
    // ]
  }

  get columnas() {
    return this.isMobile ? this.columnasCelu : this.columnasPC;
  }

  onDelete(reserva: any) {
    this._reservaService.deleteReserva(reserva.id_reserva).subscribe({
      next: (res: any) => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '300 px',
          data: {
            title: 'Eliminar reserva',
            msg: res.msg
          }
        })
        dialogRef.afterClosed().subscribe(() => {
          window.location.href = '/admin/reservas'
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

  onEdit(reserva: any) {
    const dataDialog: ReservaDataDialog<ReservaTabla, ReservaData> = {
      editar: true,
      elemento: reserva,
      listaElementos: this.getListaReservas().filter(
        (r) => r.id_reserva != reserva.id_reserva
      )
    }
    const dialogRef = this.dialog.open(ReservasDialogComponent, {
      width: '900px',
      data: dataDialog
    })
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this._reservaService
          .updateReserva(reserva.id_reserva, resultado.data)
          .subscribe({
            // next - error - complete
            next: (res: any) => {
              const dialogRef = this.dialog.open(DialogComponent, {
                width: '375px',
                autoFocus: true,
                data: {
                  title: 'Editar reserva',
                  msg: res.msg
                }
              })
              dialogRef.afterClosed().subscribe(() => {
                window.location.href = '/admin/reservas'
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
    const dataDialog: ReservaDataDialog<ReservaTabla, ReservaData> = {
      editar: false,
      listaElementos: this.getListaReservas()
    }
    const dialogRef = this.dialog.open(ReservasDialogComponent, {
      width: '900px',
      data: dataDialog
    })
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this._reservaService.createReserva(resultado.data).subscribe({
          // next - error - complete
          next: (res: any) => {
            const dialogRef = this.dialog.open(DialogComponent, {
              width: '375px',
              autoFocus: true,
              data: {
                title: 'Agregar reserva',
                msg: res.msg
              }
            })
            dialogRef.afterClosed().subscribe(() => {
              window.location.href = '/admin/reservas'
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

  getListaReservas(): ReservaData[] {
    return this.datosTabla.map((r) => {
      return {
        id_reserva: r.id_reserva,
        fechaHora: r.fechaHora,
        id_mesa: r.id_mesa
      }
    })
  }
}
