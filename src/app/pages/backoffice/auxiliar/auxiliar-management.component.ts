import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuxiliarService } from '../../../service/auxiliar.service';

@Component({
  selector: 'app-auxiliar-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Crear Auxiliar</h2>
      <form [formGroup]="auxiliarForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="aux_num_trabajador">Número de Trabajador</label>
          <input
            type="text"
            id="aux_num_trabajador"
            formControlName="aux_num_trabajador"
            pInputText
            class="border-gray-300"
            [ngClass]="{
              'border-red-500': auxiliarForm.get('aux_num_trabajador')?.invalid && auxiliarForm.get('aux_num_trabajador')?.touched
            }"
          />
          <small *ngIf="auxiliarForm.get('aux_num_trabajador')?.invalid && auxiliarForm.get('aux_num_trabajador')?.touched" class="text-red-500">
            El número de trabajador es obligatorio.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="aux_nombre">Nombre</label>
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
          <small *ngIf="auxiliarForm.get('aux_nombre')?.invalid && auxiliarForm.get('aux_nombre')?.touched" class="text-red-500">
            El nombre es obligatorio.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="aux_apellidos">Apellidos</label>
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
          <small *ngIf="auxiliarForm.get('aux_apellidos')?.invalid && auxiliarForm.get('aux_apellidos')?.touched" class="text-red-500">
            Los apellidos son obligatorios.
          </small>
        </div>
        <div class="flex flex-col gap-2">
          <label for="aux_password">Contraseña</label>
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
          <small *ngIf="auxiliarForm.get('aux_password')?.invalid && auxiliarForm.get('aux_password')?.touched" class="text-red-500">
            La contraseña es obligatoria y debe tener al menos 6 caracteres.
          </small>
        </div>
        <div class="flex justify-end">
          <p-button label="Crear Auxiliar" type="submit" [disabled]="auxiliarForm.invalid" />
        </div>
      </form>
    </div>
  `
})
export class AuxiliarManagementComponent implements OnInit {
  auxiliarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auxiliarService: AuxiliarService
  ) {
    this.auxiliarForm = this.fb.group({
      aux_num_trabajador: ['', [Validators.required, Validators.maxLength(10)]],
      aux_nombre: ['', [Validators.required, Validators.maxLength(50)]],
      aux_apellidos: ['', [Validators.required, Validators.maxLength(150)]],
      aux_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.auxiliarForm.valid) {
      const auxiliarData = {
        ...this.auxiliarForm.value,
        roles: ['ROLE_AUXILIAR'] // Por defecto, los auxiliares creados tendrán este rol
      };
      this.auxiliarService.createAuxiliar(auxiliarData).subscribe({
        next: (response) => {
          console.log('Auxiliar creado con éxito', response);
          this.auxiliarForm.reset();
        },
        error: (error) => {
          console.error('Error al crear el auxiliar', error);
        }
      });
    }
  }
}