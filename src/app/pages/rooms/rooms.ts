import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { RoomsService } from '../../service/rooms.service';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
    selector: 'app-rooms',
    standalone: true,
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule, InputTextModule, FieldsetModule, ButtonModule, ProgressSpinnerModule],
    template: `
        <div *ngIf="loading; else content">
             <!-- TODO Añadir skeleton loader -->
        </div>
        <ng-template #content>
            <div class=" overflow-y-auto">
                <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mb-8">
                    <div *ngFor="let room of rooms" class="card w-full !p-0 !mb-0">
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
                                    <b class="text-xl">Ocupado</b>
                                </div>
                                <div *ngIf="room.paciente === null">
                                    <b class="text-xl">Libre</b>
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
                                <p-button iconPos="right" icon="pi pi-arrow-right" label="Entrar l'habitació" size="large" class="w-1/4 flex justify-between" (click)="openRoom(room.hab_id)" />

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

        <!-- <div>
            <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 justify-items-center pb-10">
                <p-card *ngFor="let room of rooms" name="rooms-data" class="w-full [&_.p-card-body]:!p-0">
                    <section>
                        <div class="flex flex-row">
                            <div class="w-[10rem] p-5 bg-[var(--primary-color)] rounded-tl-[var(--content-border-radius)] rounded-br-[var(--content-border-radius)] text-center">
                                <span class=" text-white text-4xl font-bold">{{ room.hab_id }}</span>
                            </div>
                            <div class="p-5 flex gap-3 items-center w-4/6">
                                <b class="text-2xl">Data</b>
                                <b *ngIf="room.paciente !== null" class="text-lg mt-1 pl-2 border-l-2 border-blue-600"> {{ room.paciente.pac_fecha_ingreso }} </b>
                                <b *ngIf="room.paciente === null" class="text-lg mt-1 pl-2 border-l-2 border-blue-600"> &nbsp; </b>
                            </div>
                            <div class="p-5 w-1/6 flex flex-col justify-center items-center">
                                <div *ngIf="room.paciente !== null">
                                    <b class="text-xl">Ocupado</b>
                                </div>
                                <div *ngIf="room.paciente === null">
                                    <b class="text-xl">Libre</b>
                                </div>
                            </div>
                        </div>
                        <div class="my-5 mx-5">
                            <div class="max-h-[90px] min-h-[90px] mb-5 flex justify-between">
                                <div class="min-h-auto w-full border rounded-[var(--content-border-radius)]">
                                    <p class="line-clamp-3 p-2 break-words text-lg justify-center"><b class="text-lg"> Observacions: &nbsp; </b> {{ room.hab_obs }}</p>
                                </div>
                            </div>
                            <div *ngIf="room.paciente !== null" class="flex gap-5 max-h-[40px] min-h-[40px]">
                                <button class="p-3 border rounded-[var(--content-border-radius)] bg-blue-700 text-white w-1/4 flex justify-between" (click)="openRoom(room.hab_id)">
                                    <b>Entrar</b>
                                    <i class="pi pi-arrow-right" style="font-size: 1rem"></i>
                                </button>
                                <div class="p-3 border rounded-[var(--content-border-radius)] w-1/4 truncate"><b>Edat</b> | {{ room.paciente.pac_edad }}</div>
                                <div class="p-3 border rounded-[var(--content-border-radius)] w-2/4 truncate"><b>Nom</b> | {{ room.paciente.pac_nombre }} {{ room.paciente.pac_apellidos }}</div>
                            </div>
                            <div *ngIf="room.paciente === null" class="flex gap-5 max-h-[40px] min-h-[40px]">
                                <button class="p-3 border rounded-[var(--content-border-radius)] bg-gray-500 text-white w-1/4 flex justify-between cursor-not-allowed" disabled>
                                    <b>Entrar</b>
                                    <i class="pi pi-arrow-right" style="font-size: 1rem"></i>
                                </button>
                                <div class="p-3 border rounded-[var(--content-border-radius)] w-1/4 truncate"><b>Edat</b> |</div>
                                <div class="p-3 border rounded-[var(--content-border-radius)] w-2/4 truncate"><b>Nom</b> |</div>
                            </div>
                        </div>
                    </section>
                </p-card>
            </div>
        </div> -->
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
