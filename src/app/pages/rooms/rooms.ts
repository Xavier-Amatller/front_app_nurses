import {
    animate,
    style,
    transition,
    trigger
} from '@angular/animations';
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
import { RoomsService } from '../../service/rooms.service';
@Component({
    selector: 'app-rooms',
    standalone: true,
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule, InputTextModule, FieldsetModule, ButtonModule, ProgressSpinnerModule],
    animations: [trigger('fadeAnimation', [transition(':enter', [style({ opacity: 0 }), animate('600ms ease-in', style({ opacity: 1 }))]), transition(':leave', [animate('400ms ease-out', style({ opacity: 0 }))])])],
    template: `
        <div @fadeAnimation class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mb-8" *ngIf="loading; else content">
            <p-skeleton class="w-[100%] transition-all" height="270.55px"></p-skeleton>
            <p-skeleton class="w-[100%] transition-all" height="270.55px"></p-skeleton>
            <p-skeleton class="w-[100%] transition-all" height="270.55px"></p-skeleton>
            <p-skeleton class="w-[100%] transition-all" height="270.55px"></p-skeleton>
        </div>
        <ng-template #content>
            <div class=" overflow-y-auto">
                <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mb-8">
                    <div @fadeAnimation *ngFor="let room of rooms" class="card w-full !p-0 !mb-0">
                        <div class="flex flex-row">
                            <div class="flex justify-between items-center p-5 bg-[var(--primary-color)] rounded-tl-[var(--content-border-radius)] rounded-br-[var(--content-border-radius)] w-[10rem] text-center">
                                <span class=" text-white text-4xl font-bold">{{ room.hab_id }}</span>
                            </div>
                            <div class="p-5 flex gap-3 items-center w-4/6">
                                <b class="text-2xl">Data</b>
                                <b *ngIf="room.paciente !== null" class="text-lg mt-1 pl-2 border-l-2 border-blue-600"> {{ room.paciente.pac_fecha_ingreso }} </b>
                                <b *ngIf="room.paciente === null" class="text-lg mt-1 pl-2 border-l-2 border-blue-600"> &nbsp; </b>
                            </div>
                            <div class="p-5 w-1/6 flex flex-col justify-center items-center">
                                <div *ngIf="room.paciente !== null">
                                    <b class="text-xl">Ocupat</b>
                                </div>
                                <div *ngIf="room.paciente === null">
                                    <b class="text-xl">Lliure</b>
                                </div>
                            </div>
                        </div>
                        <div class=" m-5 mt-1">
                            <p-fieldset legend="Observacions" [toggleable]="false" class="m-5 !p-0 ">
                                <p class="h-[57px] overflow-hidden line-clamp-3 break-words text-lg justify-center">
                                    {{ room.hab_obs }}
                                </p>
                            </p-fieldset>
                            <div *ngIf="room.paciente !== null" class="flex gap-5 max-h-[40px] min-h-[40px]">
                                <p-button iconPos="right" icon="pi pi-arrow-right" label="Entrar" size="large" class="w-1/4 flex justify-between" (click)="openRoom(room.hab_id)" />

                                <div class="p-3 border border-[var(--p-fieldset-border-color)]  rounded-[var(--content-border-radius)] w-1/4 truncate"><b>Edat</b> | {{ room.paciente.pac_edad }}</div>
                                <div class="p-3 border border-[var(--p-fieldset-border-color)]  rounded-[var(--content-border-radius)] w-2/4 truncate"><b>Nom</b> | {{ room.paciente.pac_nombre }} {{ room.paciente.pac_apellidos }}</div>
                            </div>
                            <div *ngIf="room.paciente === null" class="flex gap-5 max-h-[40px] min-h-[40px]">
                                <p-button [disabled]="true" iconPos="right" icon="pi pi-arrow-right" label="Entrar l'habitació" size="large" class="w-1/4 flex justify-between" />

                                <div class="p-3 border  border-[var(--p-fieldset-border-color)] rounded-[var(--content-border-radius)] w-1/4 truncate"><b>Edat</b> |</div>
                                <div class="p-3 border  border-[var(--p-fieldset-border-color)] rounded-[var(--content-border-radius)] w-2/4 truncate"><b>Nom</b> |</div>
                            </div>
                        </div>
                    </div>
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

    openRoom(room_id: string) {
        this.router.navigate(['habitacions/', room_id]);
    }
}
