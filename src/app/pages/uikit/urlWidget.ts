import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    standalone: true,
    selector: 'app-url-widget',
    imports: [CommonModule, RouterModule],
    template: ` <div>
        <a *ngFor="let segment of urlArray; let i = index" [routerLink]="getRouterLink(i)" [class]="getStyle(i)">
            {{ segment }}
        </a>
    </div>`
})
export class UrlWidget {
    currentUrl: string = '';
    urlArray: string[] = [];

    constructor(private readonly router: Router) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
            this.currentUrl = event.url;
            this.urlArray = this.currentUrl.split('/').filter((segment) => segment);
        });
    }

    getStyle(index: number): string {
        return index === this.urlArray.length - 1 ? 'url-widget-active' : 'url-widget';
    }

    
    getRouterLink(index: number): string {
        return '/' + this.urlArray.slice(0, index + 1).join('/');
    }
}
