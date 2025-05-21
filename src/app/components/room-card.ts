import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
    selector: 'app-room-card',
    standalone: true,
    imports: [CommonModule, CardModule, FieldsetModule, ButtonModule],
    template: `
        <div class="card w-full !p-0 !pb-3">
            <div class="flex flex-row">
                <div class="flex justify-between items-center p-5 bg-[var(--primary-color)] rounded-tl-[var(--content-border-radius)] rounded-br-[var(--content-border-radius)] w-[10rem] text-center">
                    <span class="text-white text-4xl font-bold">{{ room.hab_id }}</span>
                </div>
                <div class="p-5 flex gap-3 items-center w-4/6">
                    <b class="text-2xl">Data</b>
                    <b *ngIf="room.paciente !== null" class="text-lg mt-1 pl-2 border-l-2 border-blue-600">{{ room.paciente.pac_fecha_ingreso }}</b>
                    <b *ngIf="room.paciente === null" class="text-lg mt-1 pl-2 border-l-2 border-blue-600">&nbsp;</b>
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
            <div class="!m-5 mt-1 !mb-2">
                <p-fieldset legend="Observacions" [toggleable]="false" class="m-5 !p-0">
                    <p class="h-[57px] overflow-hidden line-clamp-3 break-words text-lg justify-center">
                        {{ room.hab_obs }}
                    </p>
                </p-fieldset>
                <div *ngIf="room.paciente !== null" class="flex gap-5 max-h-[40px] min-h-[40px]">
                    <p-button iconPos="right" icon="pi pi-arrow-right" label="Entrar" size="large" class="w-1/4 flex justify-between" (click)="openRoom()" />
                    <div class="p-3 border border-[var(--p-fieldset-border-color)] rounded-[var(--content-border-radius)] w-1/4 truncate"><b>Edat</b> | {{ room.paciente.pac_edad }}</div>
                    <div class="p-3 border border-[var(--p-fieldset-border-color)] rounded-[var(--content-border-radius)] w-2/4 truncate"><b>Nom</b> | {{ room.paciente.pac_nombre }} {{ room.paciente.pac_apellidos }}</div>
                </div>
                <div *ngIf="room.paciente === null" class="flex gap-5 max-h-[40px] min-h-[40px]">
                    <p-button [disabled]="true" iconPos="right" icon="pi pi-arrow-right" label="Entrar l'habitació" size="large" class="w-1/4 flex justify-between" />
                    <div class="p-3 border border-[var(--p-fieldset-border-color)] rounded-[var(--content-border-radius)] w-1/4 truncate"><b>Edat</b> |</div>
                    <div class="p-3 border border-[var(--p-fieldset-border-color)] rounded-[var(--content-border-radius)] w-2/4 truncate"><b>Nom</b> |</div>
                </div>
            </div>
        </div>
    `
})
export class RoomCardComponent {
    @Input() room: any;

    constructor(private router: Router) {}

    openRoom(): void {
        this.router.navigate(['habitacions', this.room.hab_id]);
    }
}
