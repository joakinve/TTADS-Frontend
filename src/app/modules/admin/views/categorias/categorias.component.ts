import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs'
import { CategoriasService } from '../../services/categorias.service'
import { MatDialog } from '@angular/material/dialog'
import { CategoriasDialogComponent } from '../../components/categorias-dialog/categorias-dialog.component'
import { CategoriaTabla } from './models'
import { AdminDataDialog } from '../../models/adminDataDialog'
import { TableColumn } from 'src/app/shared/models/tableColumn/tableColumn'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'

@Component({
  selector: 'pa-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  datosTabla: CategoriaTabla[] = []
  columnas: TableColumn[] = []

  msgConfirmacion = {
    title: 'Confirmar eliminación de la categoría',
    msg: '¿Estás seguro de eliminar la categoría? Esta acción no se puede deshacer.'
  }

  constructor(
    private _categoriaService: CategoriasService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarCategorias()
  }

  cargarCategorias() {
    // Obtengo los datos de la tabla Categorías
    this._categoriaService
      .getAllCategorias()
      .pipe(
        map((res: any) => {
          this.datosTabla = Object.keys(res).map((c) => ({
            id_categoria: res[c].id_categoria,
            descripcion: res[c].descripcion
          }))
        })
      )
      .subscribe({
        error: (err: any) =>
          console.error(`Código de error ${err.status}: `, err.error.msg)
      })
    // Defino las columnas de la tabla Categorías
    this.columnas = [
      { name: 'Descripción', dataKey: 'descripcion' },
      {
        name: ' ',
        dataKey: 'actionButtons',
        editButton: true,
        deleteButton: true
      }
    ]
  }

  onDelete(categoria: any) {
    this._categoriaService.deleteCategoria(categoria.id_categoria).subscribe({
      next: (res: any) => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '300 px',
          data: {
            title: 'Eliminar categoría',
            msg: res.msg
          }
        })
        dialogRef.afterClosed().subscribe(() => {
          window.location.href = '/admin/categorias'
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

  onEdit(categoria: any) {
    const dataDialog: AdminDataDialog<CategoriaTabla> = {
      editar: true,
      elemento: categoria
    }
    const dialogRef = this.dialog.open(CategoriasDialogComponent, {
      width: '900px',
      data: dataDialog
    })
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this._categoriaService
          .updateCategoria(categoria.id_categoria, resultado.data)
          .subscribe({
            // next - error - complete
            next: (res: any) => {
              const dialogRef = this.dialog.open(DialogComponent, {
                width: '375px',
                autoFocus: true,
                data: {
                  title: 'Editar categoría',
                  msg: res.msg
                }
              })
              dialogRef.afterClosed().subscribe(() => {
                window.location.href = '/admin/categorias'
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
    const dataDialog: AdminDataDialog<CategoriaTabla> = {
      editar: false
    }
    const dialogRef = this.dialog.open(CategoriasDialogComponent, {
      width: '900px',
      data: dataDialog
    })
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this._categoriaService.createCategoria(resultado.data).subscribe({
          // next - error - complete
          next: (res: any) => {
            const dialogRef = this.dialog.open(DialogComponent, {
              width: '375px',
              autoFocus: true,
              data: {
                title: 'Agregar categoría',
                msg: res.msg
              }
            })
            dialogRef.afterClosed().subscribe(() => {
              window.location.href = '/admin/categorias'
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
