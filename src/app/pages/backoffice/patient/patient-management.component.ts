import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { PatientService } from '../../../service/patient.service';

@Component({
    selector: 'app-patient-management',
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
        NgIf
    ],
    providers: [MessageService], // Añadir MessageService como proveedor
    template: `
        <p-toast></p-toast>
        <div class="card">
            <div class="mb-4">
                <input [(ngModel)]="pac_id" pInputText id="numPac" type="text" placeholder="ID del pacient" />
                <p-button class="ml-3" (onClick)="searchPacient()" [loading]="loading" [disabled]="!pac_id" label="Trobar pacient" [fluid]="false"></p-button>
            </div>

            <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Modificar Paciente' : 'Crear Paciente' }}</h2>
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
                    <small *ngIf="patientForm.get('pac_num_historial')?.invalid && patientForm.get('pac_num_historial')?.touched" class="text-red-500">El número de historial es obligatorio.</small>
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
                    <small *ngIf="patientForm.get('pac_nombre')?.invalid && patientForm.get('pac_nombre')?.touched" class="text-red-500">El nombre es obligatorio.</small>
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
                    <small *ngIf="patientForm.get('pac_apellidos')?.invalid && patientForm.get('pac_apellidos')?.touched" class="text-red-500">Los apellidos son obligatorios.</small>
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
                    <small *ngIf="patientForm.get('pac_fecha_nacimiento')?.invalid && patientForm.get('pac_fecha_nacimiento')?.touched" class="text-red-500">La fecha de nacimiento es obligatoria.</small>
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
                    <small *ngIf="patientForm.get('pac_direccion_completa')?.invalid && patientForm.get('pac_direccion_completa')?.touched" class="text-red-500">La dirección es obligatoria.</small>
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
                    <small *ngIf="patientForm.get('pac_lengua_materna')?.invalid && patientForm.get('pac_lengua_materna')?.touched" class="text-red-500">La lengua materna es obligatoria.</small>
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
                    <small *ngIf="patientForm.get('pac_antecedentes')?.invalid && patientForm.get('pac_antecedentes')?.touched" class="text-red-500">Los antecedentes son obligatorios.</small>
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
                    <small *ngIf="patientForm.get('pac_alergias')?.invalid && patientForm.get('pac_alergias')?.touched" class="text-red-500">Las alergias son obligatorias.</small>
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
                    <small *ngIf="patientForm.get('pac_nombre_cuidador')?.invalid && patientForm.get('pac_nombre_cuidador')?.touched" class="text-red-500">El nombre del cuidador es obligatorio.</small>
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
                    <small *ngIf="patientForm.get('pac_telefono_cuidador')?.invalid && patientForm.get('pac_telefono_cuidador')?.touched" class="text-red-500">El teléfono del cuidador es obligatorio y debe tener 9 dígitos.</small>
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
                    <small *ngIf="patientForm.get('pac_fecha_ingreso')?.invalid && patientForm.get('pac_fecha_ingreso')?.touched" class="text-red-500">La fecha de ingreso es obligatoria.</small>
                </div>
                <div class="flex justify-end gap-2">
                    <p-button label="Cancelar" (onClick)="resetForm()" severity="secondary" />
                    <p-button [label]="isEditing ? 'Modificar Paciente' : 'Crear Paciente'" type="submit" [disabled]="patientForm.invalid" />
                </div>
            </form>
        </div>
    `
})
export class PatientManagementComponent implements OnInit {
    patientForm: FormGroup;
    pac_id: string = '';
    loading: boolean = false;
    patient: any;
    isEditing: boolean = false;

    constructor(
        private fb: FormBuilder,
        private patientService: PatientService,
        private messageService: MessageService
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

    searchPacient() {
        if (!this.pac_id) {
            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, introduce un ID de paciente.' });
            return;
        }
        this.loading = true;

        this.patientService.getPatient(this.pac_id).subscribe({
            next: (data: any) => {
                this.patient = data.paciente;
                this.isEditing = true;

                // Convertir las fechas al formato esperado por p-calendar
                const fechaNacimiento = this.parseDate(this.patient.pac_fecha_nacimiento);
                const fechaIngreso = this.parseDate(this.patient.pac_fecha_ingreso);

                // Rellenar el formulario con los datos del paciente
                this.patientForm.patchValue({
                    pac_num_historial: this.patient.pac_num_historial,
                    pac_nombre: this.patient.pac_nombre,
                    pac_apellidos: this.patient.pac_apellidos,
                    pac_fecha_nacimiento: fechaNacimiento,
                    pac_direccion_completa: this.patient.pac_direccion_completa,
                    pac_lengua_materna: this.patient.pac_lengua_materna,
                    pac_antecedentes: this.patient.pac_antecedentes,
                    pac_alergias: this.patient.pac_alergias,
                    pac_nombre_cuidador: this.patient.pac_nombre_cuidador,
                    pac_telefono_cuidador: this.patient.pac_telefono_cuidador,
                    pac_fecha_ingreso: fechaIngreso
                });

                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente encontrado.' });
            },
            error: (error: Error) => {
                console.error('Error al buscar el paciente:', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Paciente no encontrado.' });
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    parseDate(dateStr: string): Date | null {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split('-');
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    resetForm() {
        this.patientForm.reset();
        this.pac_id = '';
        this.isEditing = false;
        this.patient = null;
    }

    onSubmit(): void {
        if (this.patientForm.valid) {
            const patientData = {
                ...this.patientForm.value,
                pac_timestamp: new Date().toISOString()
            };

            if (this.isEditing) {
                // Modificar paciente
                this.patientService.updatePatient(this.pac_id, patientData).subscribe({
                    next: (response) => {
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente modificado con éxito.' });
                        this.resetForm();
                    },
                    error: (error) => {
                        console.error('Error al modificar el paciente', error);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al modificar el paciente.' });
                    }
                });
            } else {
                // Crear paciente
                this.patientService.createPatient(patientData).subscribe({
                    next: (response) => {
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente creado con éxito.' });
                        this.resetForm();
                    },
                    error: (error) => {
                        console.error('Error al crear el paciente', error);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el paciente.' });
                    }
                });
            }
        }
    }
}