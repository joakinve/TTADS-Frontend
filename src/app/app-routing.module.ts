import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PageNotFoundComponent } from '@pa/core/components'
import { canMatchAuthGuard } from './shared/guards/auth/can-match-auth.guard'
import { canMatchMozoGuard } from './shared/guards/mozo/can-match-mozo.guard'
import { canMatchUsuarioGuard } from './shared/guards/usuario/can-match-usuario.guard'
import { canMatchAdminGuard } from './shared/guards/admin/can-match-admin.guard'

const routes: Routes = [
  {
    path: '', // La / no se indica
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'reservas',
    loadChildren: () =>
      import('./modules/reservas/reservas.module').then(
        (m) => m.ReservasModule
      ),
    canMatch: [canMatchAuthGuard, canMatchUsuarioGuard]
  },
  {
    path: 'carta',
    loadChildren: () =>
      import('./modules/carta/carta.module').then((m) => m.CartaModule)
  },
  {
    path: 'mesas',
    loadChildren: () =>
      import('./modules/mesas/mesas.module').then((m) => m.MesasModule),
    canMatch: [canMatchAuthGuard, canMatchMozoGuard]
  },
  {
    path: 'pedidos',
    loadChildren: () =>
      import('./modules/pedidos/pedidos.module').then((m) => m.PedidosModule),
    canMatch: [canMatchAuthGuard, canMatchMozoGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canMatch: [canMatchAuthGuard, canMatchAdminGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./modules/usuarios/usuarios.module').then(
        (m) => m.UsuariosModule
      ),
    canMatch: [canMatchAuthGuard]
  },

  // Página 404
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'ignore',
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
