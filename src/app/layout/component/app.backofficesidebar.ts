import { Component, ElementRef } from '@angular/core';
import { AppBackOfficeMenu } from "./app.backofficemenu";

@Component({
    selector: 'app-backoffice-sidebar',
    standalone: true,
    imports: [ AppBackOfficeMenu],
    template: ` <div class="layout-sidebar">
        <app-backoffice-menu></app-backoffice-menu>
    </div>`
})
export class AppBackOfficeSidebar {
    constructor(public el: ElementRef) {}
}
