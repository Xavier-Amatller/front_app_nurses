import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { RoomCardComponent } from '../../../components/room-card';
import { Habitacion } from '../../../models/interfaces';
import { RoomsService } from '../../../service/rooms.service';

@Component({
    selector: 'app-room-management',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        InputTextModule,
        FluidModule,
        ButtonModule,
        SelectModule,
        FormsModule,
        TextareaModule,
        CheckboxModule,
        MultiSelectModule,
        ToastModule,
        MessageModule,
        NgIf,
        RoomCardComponent
    ],

    template: `
        <div class="card">
            <h2 class="text-xl font-semibold mb-4">Asignar Habitaciones</h2>
            <div class="flex justify-between">
                <label for="numRoom" class="sr-only"></label>
                <div>
                    <input [(ngModel)]="hab_id" pInputText id="numRoom" type="text" placeholder="Num habitació" [class.ng-invalid]="!hab_id" />
                    <p-button class="ml-3" (onClick)="searchHabitacio()" [loading]="loading" [disabled]="!hab_id" label="Trobar habitacio" [fluid]="false"></p-button>
                </div>
                <p-button *ngIf="room?.paciente" (onClick)="unassignPatient()" [loading]="asigmentloading" [disabled]="!room?.paciente" label="Donar de baixa" [fluid]="false"></p-button>
                <p-button *ngIf="room && !room?.paciente" (onClick)="assignPatient()" [loading]="asigmentloading" [disabled]="room.paciente" label="Donar de alta" [fluid]="false"></p-button>
            </div>
            <br />
            <div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;" *ngIf="room">
                <app-room-card [room]="room"></app-room-card>
            </div>
        </div>
    `
})
export class RoomManagementComponent implements OnInit {
    hab_id: string = '';
    patient_id: string = '';
    loading = false;
    asigmentloading = false;
    room: Habitacion | null = null;

    constructor(
        private fb: FormBuilder,
        private rs: RoomsService
    ) {}

    ngOnInit(): void {}

    searchHabitacio() {
        if (!this.hab_id) {
            return;
        }
        this.loading = true;

        this.rs.getRoom(this.hab_id).subscribe((data: any) => {
            this.room = data[0];
            console.log(this.room);

            this.loading = false;
        });
    }

    unassignPatient() {
        if (!this.hab_id) {
            return;
        }
        this.asigmentloading = true;

        this.rs.unassignPatient(this.hab_id).subscribe({
            next: (data: any) => {
                this.room = data.data;
            },
            error: (error: Error) => {
                console.error('Error al donar de baixa el pacient:', error);
                this.asigmentloading = false;
            },
            complete: () => {
                this.asigmentloading = false;
                this.searchHabitacio();
            }
        });
    }

    assignPatient() {
        if (!this.hab_id) {
            return;
        }
        this.asigmentloading = true;

        this.rs.assignPatient(this.hab_id, this.patient_id).subscribe({
            next: (data: any) => {
                this.room = data.data;
            },
            error: (error: Error) => {
                console.error('Error al donar de alta el pacient:', error);
                this.asigmentloading = false;
            },
            complete: () => {
                this.asigmentloading = false;
                this.searchHabitacio();
            }
        });
    }
}
