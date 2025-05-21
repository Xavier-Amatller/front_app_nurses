import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { RoomCardComponent } from '../../components/room-card';
import { RoomsService } from '../../service/rooms.service';

@Component({
    selector: 'app-rooms',
    standalone: true,
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule, InputTextModule, FieldsetModule, ButtonModule, ProgressSpinnerModule, RoomCardComponent],
    animations: [trigger('fadeAnimation', [transition(':enter', [style({ opacity: 0 }), animate('600ms ease-in', style({ opacity: 1 }))]), transition(':leave', [animate('400ms ease-out', style({ opacity: 0 }))])])],
    template: `
        <div *ngIf="loading; else content">
            <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mb-8">
                <p-skeleton height="285px" *ngFor="let i of [].constructor(4); let j = index"></p-skeleton>
            </div>
        </div>
        <ng-template #content>
            <div class="overflow-y-auto">
                <div @fadeAnimation class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mb-8">
                    <app-room-card *ngFor="let room of rooms" [room]="room"></app-room-card>
                </div>
            </div>
            <p-paginator [rows]="rows" [totalRecords]="totalRecords" [first]="first" (onPageChange)="onPageChange($event)"></p-paginator>
        </ng-template>
    `
})
export class Rooms {
    constructor(
        private rs: RoomsService,
        private router: Router
    ) {}

    totalRecords: number = 30;
    rows: number = 4;
    first: number = 1;
    rooms: any[] = [];
    loading: boolean = true;

    ngOnInit() {
        this.loadData(this.first, this.rows);
    }

    onPageChange(event: any) {
        const page = event.page + 1;
        this.loadData(page, this.rows);
    }

    loadData(page: number, rows: number) {
        this.rs.getRooms(page, rows).subscribe((data: any) => {
            this.rooms = data['rooms'];
            this.totalRecords = data['totalItems'];
            this.loading = false;
        });
    }
}
