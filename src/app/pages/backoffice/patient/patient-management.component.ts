import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { PatientService } from '../../../service/patient.service';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CalendarModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Crear Paciente</h2>
      <form [formGroup]="patientForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="pac_num_historial">Número de Historial</label>
          <input
            type="number"
            id="pac_num_historial"
            formControlName="pac_num_historial"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_num_historial')?.invalid && patientForm.get('pac_num_historial')?.touched
            }"
          />
          <small *ngIf="patientForm.get('pac_num_historial')?.invalid && patientForm.get('pac_num_historial')?.touched" class="text-red-500">
            El número de historial es obligatorio.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_nombre">Nombre</label>
          <input
            type="text"
            id="pac_nombre"
            formControlName="pac_nombre"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_nombre')?.invalid && patientForm.get('pac_nombre')?.touched
            }"
          />
          <small *ngIf="patientForm.get('pac_nombre')?.invalid && patientForm.get('pac_nombre')?.touched" class="text-red-500">
            El nombre es obligatorio.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_apellidos">Apellidos</label>
          <input
            type="text"
            id="pac_apellidos"
            formControlName="pac_apellidos"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_apellidos')?.invalid && patientForm.get('pac_apellidos')?.touched
            }"
          />
          <small *ngIf="patientForm.get('pac_apellidos')?.invalid && patientForm.get('pac_apellidos')?.touched" class="text-red-500">
            Los apellidos son obligatorios.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_fecha_nacimiento">Fecha de Nacimiento</label>
          <p-calendar
            id="pac_fecha_nacimiento"
            formControlName="pac_fecha_nacimiento"
            dateFormat="dd/mm/yy"
            [showIcon]="true"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_fecha_nacimiento')?.invalid && patientForm.get('pac_fecha_nacimiento')?.touched
            }"
          />
          <small *ngIf="patientForm.get('pac_fecha_nacimiento')?.invalid && patientForm.get('pac_fecha_nacimiento')?.touched" class="text-red-500">
            La fecha de nacimiento es obligatoria.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_direccion_completa">Dirección Completa</label>
          <input
            type="text"
            id="pac_direccion_completa"
            formControlName="pac_direccion_completa"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_direccion_completa')?.invalid && patientForm.get('pac_direccion_completa')?.touched
            }"
          />
          <small *ngIf="patientForm.get('pac_direccion_completa')?.invalid && patientForm.get('pac_direccion_completa')?.touched" class="text-red-500">
            La dirección es obligatoria.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_lengua_materna">Lengua Materna</label>
          <input
            type="text"
            id="pac_lengua_materna"
            formControlName="pac_lengua_materna"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_lengua_materna')?.invalid && patientForm.get('pac_lengua_materna')?.touched
            }"
          />
          <small *ngIf="patientForm.get('pac_lengua_materna')?.invalid && patientForm.get('pac_lengua_materna')?.touched" class="text-red-500">
            La lengua materna es obligatoria.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_antecedentes">Antecedentes</label>
          <textarea
            id="pac_antecedentes"
            formControlName="pac_antecedentes"
            pInputTextarea
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_antecedentes')?.invalid && patientForm.get('pac_antecedentes')?.touched
            }"
          ></textarea>
          <small *ngIf="patientForm.get('pac_antecedentes')?.invalid && patientForm.get('pac_antecedentes')?.touched" class="text-red-500">
            Los antecedentes son obligatorios.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_alergias">Alergias</label>
          <textarea
            id="pac_alergias"
            formControlName="pac_alergias"
            pInputTextarea
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_alergias')?.invalid && patientForm.get('pac_alergias')?.touched
            }"
          ></textarea>
          <small *ngIf="patientForm.get('pac_alergias')?.invalid && patientForm.get('pac_alergias')?.touched" class="text-red-500">
            Las alergias son obligatorias.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_nombre_cuidador">Nombre del Cuidador</label>
          <input
            type="text"
            id="pac_nombre_cuidador"
            formControlName="pac_nombre_cuidador"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_nombre_cuidador')?.invalid && patientForm.get('pac_nombre_cuidador')?.touched
            }"
          />
          <small *ngIf="patientForm.get('pac_nombre_cuidador')?.invalid && patientForm.get('pac_nombre_cuidador')?.touched" class="text-red-500">
            El nombre del cuidador es obligatorio.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_telefono_cuidador">Teléfono del Cuidador</label>
          <input
            type="text"
            id="pac_telefono_cuidador"
            formControlName="pac_telefono_cuidador"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_telefono_cuidador')?.invalid && patientForm.get('pac_telefono_cuidador')?.touched
            }"
          />
          <small *ngIf="patientForm.get('pac_telefono_cuidador')?.invalid && patientForm.get('pac_telefono_cuidador')?.touched" class="text-red-500">
            El teléfono del cuidador es obligatorio y debe tener 9 dígitos.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="pac_fecha_ingreso">Fecha de Ingreso</label>
          <p-calendar
            id="pac_fecha_ingreso"
            formControlName="pac_fecha_ingreso"
            dateFormat="dd/mm/yy"
            [showIcon]="true"
            [ngClass]="{
              'border-red-500': patientForm.get('pac_fecha_ingreso')?.invalid && patientForm.get('pac_fecha_ingreso')?.touched
            }"
          />
          <small *ngIf="patientForm.get('pac_fecha_ingreso')?.invalid && patientForm.get('pac_fecha_ingreso')?.touched" class="text-red-500">
            La fecha de ingreso es obligatoria.
          </small>
        </div>
        <div class="flex justify-end">
          <p-button label="Crear Paciente" type="submit" [disabled]="patientForm.invalid" />
        </div>
      </form>
    </div>
  `
})
export class PatientManagementComponent implements OnInit {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      pac_num_historial: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      pac_nombre: ['', [Validators.required, Validators.maxLength(50)]],
      pac_apellidos: ['', [Validators.required, Validators.maxLength(150)]],
      pac_fecha_nacimiento: ['', Validators.required],
      pac_direccion_completa: ['', [Validators.required, Validators.maxLength(255)]],
      pac_lengua_materna: ['', [Validators.required, Validators.maxLength(45)]],
      pac_antecedentes: ['', Validators.required],
      pac_alergias: ['', Validators.required],
      pac_nombre_cuidador: ['', [Validators.required, Validators.maxLength(150)]],
      pac_telefono_cuidador: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      pac_fecha_ingreso: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patientData = {
        ...this.patientForm.value,
        pac_timestamp: new Date().toISOString() // Añadimos el timestamp automáticamente
      };
      this.patientService.createPatient(patientData).subscribe({
        next: (response) => {
          console.log('Paciente creado con éxito', response);
          this.patientForm.reset();
        },
        error: (error) => {
          console.error('Error al crear el paciente', error);
        }
      });
    }
  }
}