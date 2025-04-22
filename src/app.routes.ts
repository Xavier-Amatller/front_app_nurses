import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AuthGuard } from './app/pages/auth/guards/auth.guard';
import { Login } from './app/pages/auth/login';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Diets } from './app/pages/diets/diets';
import { Notfound } from './app/pages/notfound/notfound';
import { Cares } from './app/pages/cares/cares';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: Dashboard, },
            { path: 'rooms', loadChildren: () => import('./app/pages/rooms/rooms.routes') },
            { path: 'diets', component: Diets },
            { path: 'cares', component: Cares, },
            { path: 'extras', loadChildren: () => import('./app/pages/pages.routes') },
        ]
    },
    { path: 'login', component: Login },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') }
];