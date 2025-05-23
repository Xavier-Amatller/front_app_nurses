import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-backoffice-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppBackOfficeMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Patients',
                items: [
                    { label: 'Auxiliars', icon: 'pi pi-fw pi-th-large', routerLink: ['/backoffice/auxiliars'] },
                    { label: 'Pacients', icon: 'pi pi-fw pi-building', routerLink: ['/backoffice/pacients'] },
                    { label: 'Habitacions', icon: 'pi pi-fw pi-face-smile', routerLink: ['/backoffice/habitacions'] },
                ]
            },
        ];
    }
}
