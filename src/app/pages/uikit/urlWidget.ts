import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
  isActive: boolean;
}

@Component({
  standalone: true,
  selector: 'app-url-widget',
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="card !mb-8 p-4 text-4xl" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2">
        <ng-container *ngFor="let breadcrumb of breadcrumbs; let last = last">
          <li class="flex items-center">
            <span class="mx-2 text-gray-400">/</span>
            <ng-container *ngIf="breadcrumb.isActive && (breadcrumb.label === 'Curas' || breadcrumb.label === 'Dietas'); else clickableLink">
              <span class="text-[var(--primary-color)] cursor-default" [attr.aria-current]="'page'">
                {{ breadcrumb.label }}
              </span>
            </ng-container>
            <ng-template #clickableLink>
              <a [routerLink]="breadcrumb.url"
                 [class]="breadcrumb.isActive ? 'text-[var(--primary-color)] cursor-default' : '!text-[var(--text-color)]'"
                 [attr.aria-current]="breadcrumb.isActive ? 'page' : null">
                {{ breadcrumb.label }}
              </a>
            </ng-template>
          </li>
        </ng-container>
      </ol>
    </nav>
  `,
})
export class UrlWidget implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => this.buildBreadcrumbs(event.urlAfterRedirects))
    ).subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });

    // Initial breadcrumb setup
    this.breadcrumbs = this.buildBreadcrumbs(this.router.url);
  }

  private buildBreadcrumbs(url: string): Breadcrumb[] {
    const segments = url.split('/').filter(segment => segment);
    const breadcrumbs: Breadcrumb[] = [];
    let currentPath = '';

    for (let index = 0; index < segments.length; index++) {
      const segment = segments[index];
      currentPath += `/${segment}`;

      // Skip adding the final ID in nested routes like :id/curas/:id or :id/dietes/:id
      if (index >= 2 && (segments[index - 1] === 'curas' || segments[index - 1] === 'dietes') && this.isIdSegment(segment)) {
        continue;
      }

      // Handle dynamic parameters and specific routes
      let label = this.formatLabel(segment);

      // Customize labels for specific routes
      if (this.isIdSegment(segment)) {
        label = `${segment}`;
      } else if (segment === 'habitacions') {
        label = 'Habitacions';
      } else if (segment === 'dietes') {
        label = 'Dietes';
      } else if (segment === 'cares') {
        label = 'Curas';
      }

      // Determine if this breadcrumb is active
      let isActive = index === segments.length - 1 || // Last segment by default
        (index === segments.length - 2 && (segment === 'curas' || segment === 'dietes') && index >= 1 && this.isIdSegment(segments[index + 1])); // Curas or Dietas before a final ID

      breadcrumbs.push({
        label,
        url: currentPath,
        isActive
      });
    }

    return breadcrumbs;
  }

  private isIdSegment(segment: string): boolean {
    // Check if segment is likely an ID (UUID, number, or short hash)
    return /^[0-9]+$/.test(segment) || 
           /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment);
  }

  private formatLabel(segment: string): string {
    if (!segment) return '';
    
    // Replace hyphens with spaces and capitalize each word
    return segment
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}