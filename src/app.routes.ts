import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AuthGuard } from './app/pages/auth/guards/auth.guard';
import { Login } from './app/pages/auth/login';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Diets } from './app/pages/diets/diets';
import { Notfound } from './app/pages/notfound/notfound';
import { AdminGuard } from './app/pages/auth/guards/admin.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'tauler', pathMatch: 'full' },
      { path: 'tauler', component: Dashboard },
      { path: 'habitacions', loadChildren: () => import('./app/pages/rooms/rooms.routes') },
      { path: 'dietes', component: Diets },
    ]
  },
  {
    path: 'backoffice',
    loadChildren: () => import('./app/pages/backoffice/backoffice.module').then(m => m.BackofficeModule),
    canActivate: [AdminGuard]
  },
  { path: 'login', component: Login },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') }
];