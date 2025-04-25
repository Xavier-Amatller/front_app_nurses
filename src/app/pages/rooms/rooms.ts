import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { RoomsService } from '../service/rooms.service';

@Component({
    selector: 'app-rooms',
    standalone: true,
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule],
    template: `
        <div>
            <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 justify-items-center pb-10">
                <p-card *ngFor="let room of rooms" name="rooms-data" class="border rounded-xl w-full [&_.p-card-body]:!p-0">
                    <section>
                        <div class="flex flex-row">
                            <div class="w-[10rem] p-5 bg-purple-600 rounded-tl-xl rounded-br-xl text-center">
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
                                <div class="min-h-auto w-full border rounded-xl">
                                    <p class="line-clamp-3 p-2 break-words text-lg justify-center"><b class="text-lg"> Observacions: &nbsp; </b> {{ room.hab_obs }}</p>
                                </div>
                            </div>
                            <div *ngIf="room.paciente !== null" class="flex gap-5 max-h-[40px] min-h-[40px]">
                                <button class="p-3 border rounded-xl bg-blue-700 text-white w-1/4 flex justify-between">
                                    <b>Entrar</b>
                                    <i class="pi pi-arrow-right" style="font-size: 1rem"></i>
                                </button>
                                <div class="p-3 border rounded-xl w-1/4 truncate"><b>Edat</b> | {{ room.paciente.pac_edad }}</div>
                                <div class="p-3 border rounded-xl w-2/4 truncate"><b>Nom</b> | {{ room.paciente.pac_nombre }} {{ room.paciente.pac_apellidos }}</div>
                            </div>
                            <div *ngIf="room.paciente === null" class="flex gap-5 max-h-[40px] min-h-[40px]">
                                <button class="p-3 border rounded-xl bg-gray-500 text-white w-1/4 flex justify-between cursor-not-allowed" disabled>
                                    <b>Entrar</b>
                                    <i class="pi pi-arrow-right" style="font-size: 1rem"></i>
                                </button>
                                <div class="p-3 border rounded-xl w-1/4 truncate"><b>Edat</b> |</div>
                                <div class="p-3 border rounded-xl w-2/4 truncate"><b>Nom</b> |</div>
                            </div>
                        </div>
                    </section>
                </p-card>
            </div>
            <p-paginator [rows]="rows" [totalRecords]="totalRecords" [first]="first" (onPageChange)="onPageChange($event)"></p-paginator>
        </div>
    `
})
export class Rooms {
    constructor(private rs: RoomsService) {}

    totalRecords: number = 30;
    rows: number = 4;
    first: number = 1;
    rooms: any[] = [];

    ngOnInit() {
        this.loadData(this.first, this.rows);
    }

    onPageChange(event: any) {
        const page = event.page + 1;
        this.loadData(page, this.rows);
    }

    loadData(page: number, rows: number) {
        this.rs.getRooms(page, rows).subscribe((data: any) => {
            console.log(data['rooms']);
            this.rooms = data['rooms'];
            this.totalRecords = data['totalItems'];
        });
    }
}
