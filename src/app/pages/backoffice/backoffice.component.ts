import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, NavigationEnd, Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-backoffice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
    template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Backoffice - Administración</h1>
        <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" (click)="logout()">Cerrar Sesión</button>
      </header>
      <nav class="bg-white shadow p-4">
        <ul class="flex space-x-4">
          <li>
            <a routerLink="auxiliares" routerLinkActive="text-blue-600 font-bold" [routerLinkActiveOptions]="{ exact: false }" class="text-gray-600 hover:text-blue-600">
              Gestionar Auxiliares
            </a>
          </li>
          <li>
            <a routerLink="pacientes" routerLinkActive="text-blue-600 font-bold" [routerLinkActiveOptions]="{ exact: false }" class="text-gray-600 hover:text-blue-600">
              Gestionar Pacientes
            </a>
          </li>
          <li>
            <a routerLink="habitaciones" routerLinkActive="text-blue-600 font-bold" [routerLinkActiveOptions]="{ exact: false }" class="text-gray-600 hover:text-blue-600">
              Gestionar Habitaciones
            </a>
          </li>
        </ul>
      </nav>
      <main class="p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class BackofficeComponent {
    constructor(private authService: AuthService) { }

    logout(): void {
        this.authService.logout();
    }
}