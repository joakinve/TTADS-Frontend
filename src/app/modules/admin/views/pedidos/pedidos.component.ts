import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import 'moment/locale/es'
import { TableColumn } from '@pa/shared/models'
import { map } from 'rxjs'
import { PedidosService } from '@pa/carta/services'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '@pa/shared/components'
import { PedidosDialogComponent } from '../../components/pedidos-dialog/pedidos-dialog.component'
import { PedidoTabla } from 'src/app/modules/pedidos/models/pedido'
import { AdminDataDialog } from '../../models/adminDataDialog'

@Component({
  selector: 'pa-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  datosTabla: PedidoTabla[] = []
  columnasPC: TableColumn[] = []
  columnasCelu: TableColumn[] = []

  msgConfirmacion = {
    title: 'Confirmar eliminación del pedido',
    msg: '¿Estás seguro de eliminar el pedido? Esta acción no se puede deshacer.'
  }

  constructor(
    private _pedidoService: PedidosService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarPedidos()
  }

  cargarPedidos() {
    // Obtengo los datos de la tabla Pedidos
    this._pedidoService
      .getAllPedidos()
      .pipe(
        map((res: any) => {
          this.datosTabla = Object.keys(res).map((p) => ({
            id_pedido: res[p].id_pedido,
            fechaHora: moment(res[p].fechaHora).format('DD/MM/yyyy HH:mm'),
            estado: res[p].estado,
            montoImporte: res[p].montoImporte,
            usuario: res[p].Usuario.nombre + ' ' + res[p].Usuario.apellido,
            mesa: res[p].id_mesa,
            lista_productos: res[p].Productos.map((prod: any) => {
              return {
                id_producto: prod.id_producto,
                precio: prod.PedidoProductos.precio_unitario, // Al precio se le asigna el precio del producto al momento de crear el pedido (NO el actual, PUEDE tener descuento)
                cant_selecc: prod.PedidoProductos.cantidad_prod,
                subtotal: prod.precio * prod.PedidoProductos.cantidad_prod
              }
            }),
            productos: res[p].Productos.map(
              (pr: any) =>
                pr.descripcion + ' (' + pr.PedidoProductos.cantidad_prod + ')'
            ).join(' - '),
            id_usuario: res[p].Usuario.id_usuario,
            observacion: res[p].observacion
          }))
        })
      )
      .subscribe({
        error: (err: any) =>
          console.error(`Código de error ${err.status}: `, err.error.msg)
      })
    // Defino las columnas de la tabla Pedidos
    this.columnasPC = [
      { name: 'Nro.', dataKey: 'id_pedido' },
      { name: 'Fecha y hora', dataKey: 'fechaHora' },
      { name: 'Estado', dataKey: 'estado' },
      { name: 'Monto importe', dataKey: 'montoImporte', isCurrency: true },
      { name: 'Usuario', dataKey: 'usuario' },
      { name: 'Mesa', dataKey: 'mesa' },
      { name: 'Productos', dataKey: 'productos' },
      {
        name: ' ',
        dataKey: 'actionButtons',
        editButton: true,
        deleteButton: true
      }
    ]
    this.columnasCelu = [
      { name: 'Fecha y hora', dataKey: 'fechaHora' },
      { name: 'Monto importe', dataKey: 'montoImporte', isCurrency: true },
      { name: 'Productos', dataKey: 'productos' },
      {
        name: ' ',
        dataKey: 'actionButtons',
        editButton: true,
        deleteButton: true
      }
    ]
  }

  onDelete(pedido: any) {
    this._pedidoService.deletePedido(pedido.id_pedido).subscribe({
      next: (res: any) => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '300 px',
          data: {
            title: 'Eliminar pedido',
            msg: res.msg
          }
        })
        dialogRef.afterClosed().subscribe(() => {
          window.location.href = '/admin/pedidos'
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

  onEdit(pedido: any) {
    const dataDialog: AdminDataDialog<PedidoTabla> = {
      editar: true,
      elemento: pedido
    }
    const dialogRef = this.dialog.open(PedidosDialogComponent, {
      width: '900px',
      data: dataDialog
    })
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this._pedidoService
          .updatePedido(pedido.id_pedido, resultado.data)
          .subscribe({
            // next - error - complete
            next: (res: any) => {
              const dialogRef = this.dialog.open(DialogComponent, {
                width: '375px',
                autoFocus: true,
                data: {
                  title: 'Editar pedido',
                  msg: res.msg
                }
              })
              dialogRef.afterClosed().subscribe(() => {
                window.location.href = '/admin/pedidos'
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
    const dataDialog: AdminDataDialog<PedidoTabla> = {
      editar: false
    }
    const dialogRef = this.dialog.open(PedidosDialogComponent, {
      width: '900px',
      data: dataDialog
    })
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this._pedidoService.createPedido(resultado.data).subscribe({
          // next - error - complete
          next: (res: any) => {
            const dialogRef = this.dialog.open(DialogComponent, {
              width: '375px',
              autoFocus: true,
              data: {
                title: 'Agregar pedido',
                msg: res.msg
              }
            })
            dialogRef.afterClosed().subscribe(() => {
              window.location.href = '/admin/pedidos'
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
}
