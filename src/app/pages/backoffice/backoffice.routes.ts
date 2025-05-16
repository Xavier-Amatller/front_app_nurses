import { Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { AdminGuard } from '../auth/guards/admin.guard';

export const backofficeRoutes: Routes = [
  {
    path: '',
    component: BackofficeComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'auxiliares', pathMatch: 'full' },
      { path: 'auxiliares', loadComponent: () => import('./auxiliar/auxiliar-management.component').then(m => m.AuxiliarManagementComponent) },
      { path: 'pacientes', loadComponent: () => import('./patient/patient-management.component').then(m => m.PatientManagementComponent) }
    ]
  }
];