import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { backofficeRoutes } from './backoffice.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(backofficeRoutes)],
  declarations: [], // Se usarán componentes standalone, así que no declararemos nada aquí
})
export class BackofficeModule {}