import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { RoomCardComponent } from '../../../components/room-card';
import { Habitacion } from '../../../models/interfaces';
import { RoomsService } from '../../../service/rooms.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-room-management',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        FluidModule,
        SelectModule,
        FormsModule,
        TextareaModule,
        CheckboxModule,
        MultiSelectModule,
        ToastModule,
        MessageModule,
        NgIf,
        RoomCardComponent,
        DropdownModule // Añadir DropdownModule
    ],
    providers: [MessageService],
    template: `
        <p-toast></p-toast>
        <div class="card">
            <h2 class="text-xl font-semibold mb-4">Asignar Habitaciones</h2>
            <div class="flex justify-between">
                <div>
                    <input [(ngModel)]="hab_id" pInputText id="numRoom" type="text" placeholder="Num habitació" [class.ng-invalid]="!hab_id" />
                    <p-button class="ml-3" (onClick)="searchHabitacio()" [loading]="loading" [disabled]="!hab_id" label="Trobar habitacio" [fluid]="false"></p-button>
                </div>
                <div *ngIf="room && !room?.paciente" class="flex items-center gap-2">
                    <p-dropdown
                        [(ngModel)]="patient_id"
                        [options]="patients"
                        optionLabel="pac_nombre"
                        optionValue="pac_id"
                        placeholder="Selecciona un paciente"
                        [filter]="true"
                        [showClear]="true"
                        [class.ng-invalid]="!patient_id && patients.length > 0"
                    ></p-dropdown>
                    <p-button (onClick)="assignPatient()" [loading]="asignmentloading" [disabled]="!patient_id || room.paciente" label="Donar de alta" [fluid]="false"></p-button>
                </div>
                <p-button *ngIf="room?.paciente" (onClick)="unassignPatient()" [loading]="asignmentloading" [disabled]="!room?.paciente" label="Donar de baixa" [fluid]="false"></p-button>
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
    asignmentloading = false;
    room: Habitacion | null = null;
    patients: any[] = []; // Lista de pacientes para el dropdown

    constructor(
        private fb: FormBuilder,
        private rs: RoomsService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadPatients();
    }

    loadPatients() {
        this.rs.getPatients().subscribe({
            next: (data: any) => {
                this.patients = data.patients;
            },
            error: (error: Error) => {
                console.error('Error al cargar los pacientes:', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los pacientes.' });
            }
        });
    }

    searchHabitacio() {
        if (!this.hab_id) {
            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, introduce un ID de habitación.' });
            return;
        }
        this.loading = true;

        this.rs.getRoom(this.hab_id).subscribe({
            next: (data: any) => {
                this.room = data[0];
                this.loading = false;
            },
            error: (error: Error) => {
                console.error('Error al buscar la habitación:', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Habitación no encontrada.' });
                this.loading = false;
            }
        });
    }

    unassignPatient() {
        if (!this.hab_id) {
            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, introduce un ID de habitación.' });
            return;
        }
        this.asignmentloading = true;

        this.rs.unassignPatient(this.hab_id).subscribe({
            next: (data: any) => {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente desasignado correctamente.' });
            },
            error: (error: Error) => {
                console.error('Error al donar de baixa el pacient:', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al desasignar el paciente.' });
                this.asignmentloading = false;
            },
            complete: () => {
                this.asignmentloading = false;
                this.searchHabitacio();
            }
        });
    }

    assignPatient() {
        if (!this.hab_id || !this.patient_id) {
            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, selecciona un paciente.' });
            return;
        }
        this.asignmentloading = true;

        this.rs.assignPatient(this.hab_id, this.patient_id).subscribe({
            next: (data: any) => {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente asignado correctamente.' });
            },
            error: (error: Error) => {
                console.error('Error al donar de alta el pacient:', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al asignar el paciente.' });
                this.asignmentloading = false;
            },
            complete: () => {
                this.asignmentloading = false;
                this.patient_id = ''; // Resetear la selección
                this.searchHabitacio();
            }
        });
    }
}