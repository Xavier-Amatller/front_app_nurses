import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuxiliarService } from '../../../service/auxiliar.service';

@Component({
  selector: 'app-auxiliar-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    FormsModule,
    NgIf
  ],
  providers: [MessageService],
  template: `
    <p-toast position="top-center" [life]="6000" [baseZIndex]="99999"></p-toast>
    <div class="card">
      <div class="mb-4">
        <input
          [(ngModel)]="aux_num_trabajador"
          pInputText
          id="aux_num_trabajador_search"
          type="text"
          placeholder="Número de Treballador"
        />
        <p-button
          class="ml-3"
          (onClick)="searchAuxiliar()"
          [loading]="loading"
          [disabled]="!aux_num_trabajador"
          label="Buscar Auxiliar"
        ></p-button>
      </div>

      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Modificar Auxiliar' : 'Crear Auxiliar' }}</h2>
      <form [formGroup]="auxiliarForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
        <div *ngIf="!isEditing" class="flex flex-col gap-2">
          <label for="aux_num_trabajador">Número de Treballador</label>
          <input
            type="text"
            id="aux_num_trabajador"
            formControlName="aux_num_trabajador"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': auxiliarForm.get('aux_num_trabajador')?.invalid && auxiliarForm.get('aux_num_trabajador')?.touched
            }"
            [disabled]="isEditing"
          />
          <small
            *ngIf="auxiliarForm.get('aux_num_trabajador')?.invalid && auxiliarForm.get('aux_num_trabajador')?.touched"
            class="text-red-500"
          >
            El número de treballador és obligatori.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="aux_nombre">Nom</label>
          <input
            type="text"
            id="aux_nombre"
            formControlName="aux_nombre"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': auxiliarForm.get('aux_nombre')?.invalid && auxiliarForm.get('aux_nombre')?.touched
            }"
          />
          <small
            *ngIf="auxiliarForm.get('aux_nombre')?.invalid && auxiliarForm.get('aux_nombre')?.touched"
            class="text-red-500"
          >
            El nom és obligatori.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="aux_apellidos">Cognoms</label>
          <input
            type="text"
            id="aux_apellidos"
            formControlName="aux_apellidos"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': auxiliarForm.get('aux_apellidos')?.invalid && auxiliarForm.get('aux_apellidos')?.touched
            }"
          />
          <small
            *ngIf="auxiliarForm.get('aux_apellidos')?.invalid && auxiliarForm.get('aux_apellidos')?.touched"
            class="text-red-500"
          >
            Els cognoms són obligatoris.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="aux_password">Contrasenya</label>
          <p-password
            id="aux_password"
            formControlName="aux_password"
            [toggleMask]="true"
            [feedback]="false"
            class="w-full"
            [ngClass]="{
              'border-red-500': auxiliarForm.get('aux_password')?.invalid && auxiliarForm.get('aux_password')?.touched
            }"
          />
          <small
            *ngIf="auxiliarForm.get('aux_password')?.invalid && auxiliarForm.get('aux_password')?.touched"
            class="text-red-500"
          >
            La contrasenya és obligatòria i ha de tenir almenys 6 caràcters.
          </small>
        </div>
        <div class="flex justify-end gap-2">
          <p-button label="Cancelar" (onClick)="resetForm()" severity="secondary" />
          <p-button
            [label]="isEditing ? 'Modificar Auxiliar' : 'Crear Auxiliar'"
            type="submit"
            [disabled]="auxiliarForm.invalid"
          />
        </div>
      </form>
    </div>
  `
})
export class AuxiliarManagementComponent implements OnInit {
  auxiliarForm: FormGroup;
  aux_num_trabajador: string = '';
  loading: boolean = false;
  auxiliar: any;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auxiliarService: AuxiliarService,
    private messageService: MessageService
  ) {
    this.auxiliarForm = this.fb.group({
      aux_num_trabajador: ['', [Validators.required, Validators.maxLength(10)]],
      aux_nombre: ['', [Validators.required, Validators.maxLength(50)]],
      aux_apellidos: ['', [Validators.required, Validators.maxLength(150)]],
      aux_password: ['']
    });
  }

  ngOnInit(): void {
    this.updatePasswordValidators();
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

  private updatePasswordValidators(): void {
    const passwordControl = this.auxiliarForm.get('aux_password');
    if (this.isEditing) {
      passwordControl?.setValidators([]); // No validators for update
    } else {
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]); // Required for create
    }
    passwordControl?.updateValueAndValidity({ emitEvent: false });
  }

  searchAuxiliar(): void {
    if (!this.aux_num_trabajador) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertiment',
        detail: 'Si us plau, introdueix un número de treballador.'
      });
      return;
    }
    this.loading = true;

    this.auxiliarService.findAuxiliar(this.aux_num_trabajador).subscribe({
      next: (data: any) => {
        this.auxiliar = data;
        this.isEditing = true;
        console.log('Auxiliar trobat:', this.auxiliar);
        // Bind the fetched data to the form inputs
        this.auxiliarForm.patchValue({
          aux_num_trabajador: this.auxiliar.aux_num_trabajador || '',
          aux_nombre: this.auxiliar.aux_nombre || '',
          aux_apellidos: this.auxiliar.aux_apellidos || '',
          aux_password: '' // Leave password empty for security
        });

        // Update password validators after setting isEditing to true
        this.updatePasswordValidators();

        this.messageService.add({
          severity: 'success',
          summary: 'Èxit',
          detail: 'Auxiliar trobat.',
          sticky: false 
        });
      },
      error: (error: any) => {
        console.error('Error al buscar auxiliar:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.status === 404 ? 'Auxiliar no trobat.' : 'Error en buscar auxiliar.'
        });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.auxiliarForm.reset();
    this.aux_num_trabajador = '';
    this.isEditing = false;
    this.auxiliar = null;
    // Update password validators after resetting isEditing
    this.updatePasswordValidators();
  }

  onSubmit(): void {
    if (this.auxiliarForm.valid) {
      // Prepare the data, excluding aux_password if empty during update
      const auxiliarData = {
        aux_num_trabajador: this.auxiliarForm.get('aux_num_trabajador')?.value,
        aux_nombre: this.auxiliarForm.get('aux_nombre')?.value,
        aux_apellidos: this.auxiliarForm.get('aux_apellidos')?.value,
        roles: ['ROLE_AUXILIAR'],
        ...(this.isEditing && this.auxiliarForm.get('aux_password')?.value
          ? { aux_password: this.auxiliarForm.get('aux_password')?.value }
          : !this.isEditing
          ? { aux_password: this.auxiliarForm.get('aux_password')?.value }
          : {})
      };

      console.log('Payload sent to server:', auxiliarData); // Log payload for debugging

      if (this.isEditing) {
        // Modificar auxiliar
        this.auxiliarService
          .updateAuxiliar(this.auxiliarForm.get('aux_num_trabajador')?.value, auxiliarData)
          .subscribe({
            next: (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Èxit',
                detail: 'Auxiliar modificat amb èxit.'
              });
              this.resetForm();
            },
            error: (error) => {
              console.error('Error al modificar el auxiliar:', error);
              console.error('Server response:', error.error); // Log server error details
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.status === 400
                  ? `Error en les dades enviades: ${error.error?.message || 'Verifiqui les dades.'}`
                  : error.status === 404
                  ? 'Auxiliar no trobat.'
                  : 'Error al modificar el auxiliar.'
              });
            }
          });
      } else {
        // Crear auxiliar
        this.auxiliarService.createAuxiliar(auxiliarData).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Èxit',
              detail: 'Auxiliar creado con éxito.'
            });
            this.resetForm();
          },
          error: (error) => {
            console.error('Error al crear el auxiliar:', error);
            console.error('Server response:', error.error); // Log server error details
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.status === 400
                ? `Error en les dades enviades: ${error.error?.message || 'Verifiqui les dades.'}`
                : 'Error en crear auxiliar.'
            });
          }
        });
      }
    }
  }
}