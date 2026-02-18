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
    DropdownModule
  ],
  providers: [MessageService],
  template: `
    <p-toast position="top-center" [life]="6000" [baseZIndex]="99999"></p-toast>
    <div class="card">
      <h2 class="text-xl font-semibold mb-4">Assignar Habitacions</h2>
      <div class="flex justify-between">
        <div>
          <input
            [(ngModel)]="hab_id"
            pInputText
            id="numRoom"
            type="text"
            placeholder="Número d'habitació"
            [class.ng-invalid]="!hab_id"
          />
          <p-button
            class="ml-3"
            (onClick)="searchHabitacio()"
            [loading]="loading"
            [disabled]="!hab_id"
            label="Trobar habitació"
            [fluid]="false"
          ></p-button>
        </div>
<div *ngIf="room && !room.paciente" class="mt-2">
          <p-dropdown
            [options]="patients"
            [(ngModel)]="patient_id"
            optionLabel="fullName"
            optionValue="id"
            placeholder="Selecciona un pacient"
            [filter]="true"
            filterBy="fullName"
            [showClear]="true"
          ></p-dropdown>
        </div>

        <p-button
          *ngIf="room"
          (onClick)="handleRoomAction()"
          [loading]="asignmentloading"
          [label]="room.paciente ? 'Donar de alta' : 'Donar de baixa'"
          [severity]="room.paciente ? 'danger' : 'success'"
          [fluid]="false"
        ></p-button>
      </div>
      <br />
      <div
        style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;"
        *ngIf="room"
      >
        <app-room-card [room]="room"></app-room-card>
      </div>
    </div>
  `
})
export class RoomManagementComponent implements OnInit {
  hab_id: string = '';
  patient_id: number | null = null;
  loading = false;
  asignmentloading = false;
  room: Habitacion | null = null;
  patients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private rs: RoomsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Centrar el toast */
      .p-toast.p-toast-top-center {
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
      }

      /* Estilo base del mensaje */
      .p-toast .p-toast-message {
        font-size: 1.3rem !important;
        font-weight: bold !important;
        text-align: center !important;
        padding: 1rem 1.5rem !important;
        border-radius: 10px !important;
        color: white !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
      }

      /* Éxito → verde */
      .p-toast-message-success {
        background-color: #89e791ff !important;
      }

      /* Error → rojo */
      .p-toast-message-error {
        background-color: #ee818cff !important;
      }
    `;
    document.head.appendChild(style);
  }

  searchHabitacio() {
    if (!this.hab_id) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertiment',
        detail: 'Si us plau, introdueix un ID habitació.'
      });
      return;
    }
    this.loading = true;

    this.rs.getRoom(this.hab_id).subscribe({
      next: (data: any) => {
        this.room = data;
        this.loading = false;
        if (this.room && !this.room.paciente) {
          this.loadAvailablePatients();
        }
      },
      
      error: (error: Error) => {
        console.error('Error al buscar la habitación:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Habitació no trobada.'
        });
        this.loading = false;
      }
    });
  }
loadAvailablePatients() {
    this.rs.getAvailablePatients().subscribe({
      next: (patients: any[]) => {
        this.patients = patients.map((p) => ({
          ...p,
          fullName: `${p.pac_nombre} ${p.pac_apellidos}`
        }));
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No s’han pogut carregar els pacients disponibles.'
        });
      }
    });
  }
  discharge() {
    if (!this.hab_id) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertiment',
        detail: 'Si us plau, introdueix un ID habitació.'
      });
      return;
    }
    this.asignmentloading = true;

    this.rs.discharge(this.hab_id).subscribe({
      next: (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Èxit',
          detail: 'Pacient donat de baixa correctament.'
        });
        this.asignmentloading = false;
        this.searchHabitacio();
        this.loadAvailablePatients();
      },
      error: (error: Error) => {
        console.error('Error al donar de baixa el pacient:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error en donar de baixa al pacient.'
        });
        this.asignmentloading = false;
      },
      complete: () => {
        this.asignmentloading = false;
      }
    });
  }

  assign() {
    if (!this.hab_id || !this.patient_id) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertiment',
        detail: 'Selecciona un pacient'
      });
      return;
    }

    this.asignmentloading = true;
    this.rs.assign(this.hab_id, String(this.patient_id)).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Èxit',
          detail: 'Pacient assignat correctament.'
        });
        this.searchHabitacio();
        this.loadAvailablePatients();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error en assignar el pacient.'
        });
        this.asignmentloading = false;
      }
    });
  }
  handleRoomAction() {
    if (!this.room) return;

    if (this.room.paciente) {
      this.discharge();
    } else {
      this.assign();
    }
  }
  
}