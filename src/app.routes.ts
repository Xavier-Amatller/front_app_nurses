import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Login } from './app/pages/auth/login';
import { Dashboard } from './app/pages/dashboard/dashboard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'rooms', loadChildren: () => import('./app/pages/rooms/rooms.routes') },
            /* { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') } */
        ]
    },
    { path: 'access', component: Login },
    /* { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }, */
    /* { path: 'landing', component: Landing },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') } */
];
