import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { RoomsService } from '../../../service/rooms.service';
import { Habitacion } from '../../../models/interfaces';
import { RoomCardComponent } from '../../../components/room-card';

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
        <div class="p-6 bg-white rounded-lg shadow-md">
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
