import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AuthGuard } from './app/pages/auth/guards/auth.guard';
import { Login } from './app/pages/auth/login';
import { Cares } from './app/pages/cares/cares';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Diets } from './app/pages/diets/diets';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'habitacions', loadChildren: () => import('./app/pages/rooms/rooms.routes') },
            { path: 'dietes', component: Diets },
            // { path: 'dietes/:id', component: Diets },
            // { path: 'extras', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'login', component: Login },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') }
];
