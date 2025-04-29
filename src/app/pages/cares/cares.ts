import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../service/registro.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../service/auth.service';
import { TipoDrenaje, RegistroResponse } from '../../models/interfaces';

@Component({
  selector: 'app-cares',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    DatePickerModule,
    TextareaModule,
    CheckboxModule,
    DropdownModule // Añadido
  ],
  providers: [AuthService],
  template: `
    <div class="flex flex-wrap md:flex-row gap-8">
      <div class="md:w-1/2">
        <form [formGroup]="registroForm" (ngSubmit)="onSubmit()">
          <!-- Constantes Vitales -->
          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-xl">Constantes Vitales</div>
            <div class="flex flex-col gap-2">
              <label for="cv_ta_sistolica">Tensión Arterial Sistólica</label>
              <p-inputnumber
                formControlName="cv_ta_sistolica"
                mode="decimal"
                [useGrouping]="false"
                [min]="0"
                [max]="300"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="cv_ta_diastolica">Tensión Arterial Diastólica</label>
              <p-inputnumber
                formControlName="cv_ta_diastolica"
                mode="decimal"
                [useGrouping]="false"
                [min]="0"
                [max]="200"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="cv_pulso">Pulso</label>
              <p-inputnumber
                formControlName="cv_pulso"
                mode="decimal"
                [useGrouping]="false"
                [min]="0"
                [max]="200"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="cv_frecuencia_respiratoria">Frecuencia Respiratoria</label>
              <p-inputnumber
                formControlName="cv_frecuencia_respiratoria"
                mode="decimal"
                [useGrouping]="false"
                [min]="0"
                [max]="100"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="cv_temperatura">Temperatura (°C)</label>
              <p-inputnumber
                formControlName="cv_temperatura"
                mode="decimal"
                [useGrouping]="false"
                [min]="30"
                [max]="45"
                [step]="0.1"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="cv_saturacion_oxigeno">Saturación de Oxígeno (%)</label>
              <p-inputnumber
                formControlName="cv_saturacion_oxigeno"
                mode="decimal"
                [useGrouping]="false"
                [min]="0"
                [max]="100"
              />
            </div>
          </div>

          <!-- Movilizaciones -->
          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-xl">Movilizaciones</div>
            <div class="flex flex-col gap-2">
              <label for="mov_sedestacion">Sedestación</label>
              <p-checkbox
                formControlName="mov_sedestacion"
                [binary]="true"
                inputId="mov_sedestacion"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="mov_ajuda_deambulacion">Ayuda para Deambulación</label>
              <p-checkbox
                formControlName="mov_ajuda_deambulacion"
                [binary]="true"
                inputId="mov_ajuda_deambulacion"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="mov_ajuda_descripcion">Descripción de la Ayuda</label>
              <textarea
                formControlName="mov_ajuda_descripcion"
                rows="3"
                pInputTextarea
              ></textarea>
            </div>
            <div class="flex flex-col gap-2">
              <label for="mov_cambios">Cambios Posturales</label>
              <textarea
                formControlName="mov_cambios"
                rows="3"
                pInputTextarea
              ></textarea>
            </div>
            <div class="flex flex-col gap-2">
              <label for="mov_decubitos">Decúbitos</label>
              <input
                type="text"
                formControlName="mov_decubitos"
                pInputText
                maxlength="45"
              />
            </div>
          </div>

          <!-- Diagnóstico -->
          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-xl">Diagnóstico</div>
            <div class="flex flex-col gap-2">
              <label for="dia_diagnostico">Diagnóstico</label>
              <textarea
                formControlName="dia_diagnostico"
                rows="3"
                pInputTextarea
              ></textarea>
            </div>
            <div class="flex flex-col gap-2">
              <label for="dia_motivo">Motivo del Diagnóstico</label>
              <textarea
                formControlName="dia_motivo"
                rows="3"
                pInputTextarea
              ></textarea>
            </div>
          </div>

          <!-- Drenajes -->
          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-xl">Drenajes</div>
            <div class="flex flex-col gap-2">
              <label for="dre_debito">Débito del Drenaje</label>
              <textarea
                formControlName="dre_debito"
                rows="3"
                pInputTextarea
              ></textarea>
            </div>
            <div class="flex flex-col gap-2">
              <label for="tdre_id">Tipo de Drenaje</label>
              <p-dropdown
                formControlName="tdre_id"
                [options]="tiposDrenajes"
                optionLabel="tdre_desc"
                optionValue="id"
                placeholder="Selecciona un tipo de drenaje"
                [showClear]="true"
              />
            </div>
          </div>

          <!-- Fecha del Registro -->
          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-xl">Información del Registro</div>
            <div class="flex flex-col gap-2">
              <label for="Reg_Fecha">Fecha y Hora</label>
              <p-datepicker formControlName="Reg_Fecha" [showTime]="true" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="Reg_Obs">Observaciones</label>
              <textarea formControlName="Reg_Obs" rows="3"></textarea>
            </div>
          </div>

          <!-- Botón de Guardar -->
          <div class="flex justify-end mt-4">
            <p-button label="Guardar" type="submit" [disabled]="registroForm.invalid" />
          </div>
        </form>
      </div>
    </div>
  `
})
// Ajustar la propiedad tiposDrenajes y los métodos
export class Cares implements OnInit {
  registroForm: FormGroup;
  auxiliarId: string | null = null;
  tiposDrenajes: TipoDrenaje[] = []; // Ahora usamos el tipo importado del servicio

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router,
    private readonly AuthService: AuthService
  ) {
    this.registroForm = this.fb.group({
      cv_ta_sistolica: [null, Validators.required],
      cv_ta_diastolica: [null, Validators.required],
      cv_pulso: [null, Validators.required],
      cv_frecuencia_respiratoria: [null, Validators.required],
      cv_temperatura: [null, Validators.required],
      cv_saturacion_oxigeno: [null, Validators.required],
      mov_sedestacion: [false, Validators.required],
      mov_ajuda_deambulacion: [false, Validators.required],
      mov_ajuda_descripcion: [''],
      mov_cambios: [''],
      mov_decubitos: [''],
      dia_diagnostico: [''],
      dia_motivo: [''],
      dre_debito: [''],
      tdre_id: [null],
      Reg_Fecha: [new Date(), Validators.required],
      Reg_Obs: ['']
    });

    // Añadir validación condicional para tdre_id
    this.registroForm.get('dre_debito')?.valueChanges.subscribe(dreDebito => {
      const tdreIdControl = this.registroForm.get('tdre_id');
      if (dreDebito) {
        tdreIdControl?.setValidators(Validators.required);
      } else {
        tdreIdControl?.clearValidators();
      }
      tdreIdControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.auxiliarId = this.AuthService.getAuxiliarId();
    if (!this.auxiliarId) {
      console.error('No se encontró el ID del auxiliar. Redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    }

    this.registroService.getTiposDrenajes().subscribe({
      next: (tipos: TipoDrenaje[]) => {
        this.tiposDrenajes = tipos;
      },
      error: (error) => {
        console.error('Error al cargar los tipos de drenajes', error);
      }
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const registroData = {
        aux_id: this.auxiliarId,
        pac_id: '1',
        reg_fecha: this.registroForm.value.Reg_Fecha.toISOString(),
        reg_obs: this.registroForm.value.Reg_Obs,
        constantes_vitales: {
          cv_ta_sistolica: this.registroForm.value.cv_ta_sistolica,
          cv_ta_diastolica: this.registroForm.value.cv_ta_diastolica,
          cv_pulso: this.registroForm.value.cv_pulso,
          cv_frecuencia_respiratoria: this.registroForm.value.cv_frecuencia_respiratoria,
          cv_temperatura: this.registroForm.value.cv_temperatura,
          cv_saturacion_oxigeno: this.registroForm.value.cv_saturacion_oxigeno
        },
        movilizaciones: {
          mov_sedestacion: this.registroForm.value.mov_sedestacion,
          mov_ajuda_deambulacion: this.registroForm.value.mov_ajuda_deambulacion,
          mov_ajuda_descripcion: this.registroForm.value.mov_ajuda_descripcion,
          mov_cambios: this.registroForm.value.mov_cambios,
          mov_decubitos: this.registroForm.value.mov_decubitos
        },
        diagnostico: {
          dia_diagnostico: this.registroForm.value.dia_diagnostico,
          dia_motivo: this.registroForm.value.dia_motivo
        },
        drenaje: {
          dre_debito: this.registroForm.value.dre_debito,
          tdre_id: this.registroForm.value.tdre_id
        }
      };

      console.log(registroData);

      this.registroService.createRegistro(registroData).subscribe({
        next: (response: RegistroResponse) => {
          console.log('Registro creado con éxito', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error al crear el registro', error);
        }
      });
    }
  }
}
