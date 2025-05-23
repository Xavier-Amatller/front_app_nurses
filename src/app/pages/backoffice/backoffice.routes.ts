import { Routes } from '@angular/router';
import { AppBackofficeLayout } from '../../layout/component/backoffice.layout';
import { AdminGuard } from '../auth/guards/admin.guard';

export const backofficeRoutes: Routes = [
    {
        path: '',
        // component: BackofficeComponent,
        component: AppBackofficeLayout,

        canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'auxiliares', pathMatch: 'full' },
            { path: 'auxiliars', loadComponent: () => import('./auxiliar/auxiliar-management.component').then((m) => m.AuxiliarManagementComponent) },
            { path: 'pacients', loadComponent: () => import('./patient/patient-management.component').then((m) => m.PatientManagementComponent) },
            { path: 'habitacions', loadComponent: () => import('./room/room-management.component').then((m) => m.RoomManagementComponent) }
        ]
    }
];
