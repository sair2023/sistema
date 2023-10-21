import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthGuard } from './core/guard/auth.guard';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'advance-table',
        loadChildren: () =>
          import('./advance-table/advance-table.module').then(
            (m) => m.AdvanceTableModule
          ),
      },
      {
        path: 'usuario',
        loadChildren: () =>
          import('./usuario/usuario.module').then(
            (m) => m.UsuarioModule
          ),
      },
      {
        path: 'empleados',
        loadChildren: () =>
          import('./empleado/empleado.module').then(
            (m) => m.EmpleadoModule
          ),
      },
      {
        path: 'salarios',
        loadChildren: () =>
          import('./salario/salario.module').then(
            (m) => m.SalarioModule
          ),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('./cuenta/cuenta.module').then(
            (m) => m.CuentaModule
          ),
      },
      {
        path: 'ventas',
        loadChildren: () =>
          import('./ventas/ventas.module').then(
            (m) => m.VentasModule
          ),
      },
      {
        path: 'tiendas',
        loadChildren: () =>
          import('./tienda/tienda.module').then(
            (m) => m.TiendaModule
          ),
      },
]},
{
  path:'login',
  loadChildren: () =>
  import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  { path: '**', component:Page404Component},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
