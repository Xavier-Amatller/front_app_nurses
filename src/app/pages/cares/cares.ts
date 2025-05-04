import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../service/registro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../service/auth.service';
import { TipoDrenaje, RegistroResponse, TipoTextura, TipoDieta } from '../../models/interfaces';
import { MultiSelectModule } from 'primeng/multiselect';

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
    DropdownModule,
    MultiSelectModule
  ],
  providers: [AuthService],
  template: `
    <div>
      <form class="flex flex-col-2 gap-8" [formGroup]="registroForm" (ngSubmit)="onSubmit()">
        <div class="md:w-1/2">
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
                [ngClass]="{
                  'border-red-500': registroForm.get('cv_ta_sistolica')?.invalid && registroForm.get('cv_ta_sistolica')?.touched
                }"
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
                [ngClass]="{
                  'border-red-500': registroForm.get('cv_ta_diastolica')?.invalid && registroForm.get('cv_ta_diastolica')?.touched
                }"
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
                [ngClass]="{
                  'border-red-500': registroForm.get('cv_pulso')?.invalid && registroForm.get('cv_pulso')?.touched
                }"
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
                [ngClass]="{
                  'border-red-500': registroForm.get('cv_frecuencia_respiratoria')?.invalid && registroForm.get('cv_frecuencia_respiratoria')?.touched
                }"
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
                [ngClass]="{
                  'border-red-500': registroForm.get('cv_temperatura')?.invalid && registroForm.get('cv_temperatura')?.touched
                }"
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
                [ngClass]="{
                  'border-red-500': registroForm.get('cv_saturacion_oxigeno')?.invalid && registroForm.get('cv_saturacion_oxigeno')?.touched
                }"
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
                [ngClass]="{
                  'border-red-500': registroForm.get('mov_sedestacion')?.invalid && registroForm.get('mov_sedestacion')?.touched
                }"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="mov_ajuda_deambulacion">Ayuda para Deambulación</label>
              <p-checkbox
                formControlName="mov_ajuda_deambulacion"
                [binary]="true"
                inputId="mov_ajuda_deambulacion"
                [ngClass]="{
                  'border-red-500': registroForm.get('mov_ajuda_deambulacion')?.invalid && registroForm.get('mov_ajuda_deambulacion')?.touched
                }"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="mov_ajuda_descripcion">Descripción de la Ayuda</label>
              <textarea
                formControlName="mov_ajuda_descripcion"
                rows="3"
                pInputTextarea
                [ngClass]="{
                  'border-red-500': registroForm.get('mov_ajuda_descripcion')?.invalid && registroForm.get('mov_ajuda_descripcion')?.touched
                }"
              ></textarea>
            </div>
            <div class="flex flex-col gap-2">
              <label for="mov_cambios">Cambios Posturales</label>
              <textarea
                formControlName="mov_cambios"
                rows="3"
                pInputTextarea
                [ngClass]="{
                  'border-red-500': registroForm.get('mov_cambios')?.invalid && registroForm.get('mov_cambios')?.touched
                }"
              ></textarea>
            </div>
            <div class="flex flex-col gap-2">
              <label for="mov_decubitos">Decúbitos</label>
              <input
                type="text"
                formControlName="mov_decubitos"
                pInputText
                maxlength="45"
                [ngClass]="{
                  'border-red-500': registroForm.get('mov_decubitos')?.invalid && registroForm.get('mov_decubitos')?.touched
                }"
              />
            </div>
          </div>
        </div>
        <div class="md:w-1/2">
          <!-- Diagnóstico -->
          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-xl">Diagnóstico</div>
            <div class="flex flex-col gap-2">
              <label for="dia_diagnostico">Diagnóstico</label>
              <textarea
                formControlName="dia_diagnostico"
                rows="3"
                pInputTextarea
                [ngClass]="{
                  'border-red-500': registroForm.get('dia_diagnostico')?.invalid && registroForm.get('dia_diagnostico')?.touched
                }"
              ></textarea>
            </div>
            <div class="flex flex-col gap-2">
              <label for="dia_motivo">Motivo del Diagnóstico</label>
              <textarea
                formControlName="dia_motivo"
                rows="3"
                pInputTextarea
                [ngClass]="{
                  'border-red-500': registroForm.get('dia_motivo')?.invalid && registroForm.get('dia_motivo')?.touched
                }"
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
                [ngClass]="{
                  'border-red-500': registroForm.get('dre_debito')?.invalid && registroForm.get('dre_debito')?.touched
                }"
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
                [ngClass]="{
                  'border-red-500': registroForm.get('tdre_id')?.invalid && registroForm.get('tdre_id')?.touched
                }"
              />
            </div>
          </div>

          <!-- Fecha del Registro -->
          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-xl">Información del Registro</div>
            <div class="flex flex-col gap-2">
              <label for="Reg_Obs">Observaciones</label>
              <textarea
                formControlName="Reg_Obs"
                rows="3"
                pInputTextarea
                [ngClass]="{
                  'border-red-500': registroForm.get('Reg_Obs')?.invalid && registroForm.get('Reg_Obs')?.touched
                }"
              ></textarea>
            </div>
          </div>

          <!-- Botón de Guardar -->
          <div class="flex justify-end mt-4">
            <p-button label="Guardar" type="submit" [disabled]="registroForm.invalid" />
          </div>
        </div>
      </form>
    </div>
  `
})
export class Cares implements OnInit {
  registroForm: FormGroup;
  auxiliarId: string | null = null;
  pacienteId: string | null = null;
  tiposDrenajes: TipoDrenaje[] = [];
  tiposTexturas: TipoTextura[] = [];
  tiposDietas: TipoDieta[] = [];

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router,
    private readonly AuthService: AuthService,
    private readonly route: ActivatedRoute,

  ) {
    this.registroForm = this.fb.group({
      cv_ta_sistolica: [null, Validators.required],
      cv_ta_diastolica: [null, Validators.required],
      cv_pulso: [null, Validators.required],
      cv_frecuencia_respiratoria: [null, Validators.required],
      cv_temperatura: [null, Validators.required],
      cv_saturacion_oxigeno: [null, Validators.required],
      mov_sedestacion: [null, Validators.required], // Checkbox, solo necesita un valor (true o false)
      mov_ajuda_deambulacion: [null, Validators.required], // Checkbox, solo necesita un valor (true o false)
      mov_ajuda_descripcion: ['', Validators.required],
      mov_cambios: ['', Validators.required],
      mov_decubitos: ['', Validators.required],
      dia_diagnostico: ['', Validators.required],
      dia_motivo: ['', Validators.required],
      dre_debito: ['', Validators.required],
      tdre_id: [null, Validators.required],
      Reg_Fecha: [new Date(), Validators.required],
      Reg_Obs: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.auxiliarId = this.AuthService.getAuxiliarId();
    if (!this.auxiliarId) {
      this.router.navigate(['/login']);
      return;
    }

    this.pacienteId = this.route.snapshot.paramMap.get('id');

    if (!this.pacienteId) {
      this.router.navigate(['/habitacions']);
      return;
    }

    // Cargar tipos de drenajes
    this.registroService.getTiposDrenajes().subscribe({
      next: (tipos: TipoDrenaje[]) => {
        this.tiposDrenajes = tipos;
      },
      error: (error) => {
        console.error('Error al cargar los tipos de drenajes', error);
      }
    });

    // Cargar tipos de texturas
    this.registroService.getTiposTexturas().subscribe({
      next: (tipos: TipoTextura[]) => {
        this.tiposTexturas = tipos;
      },
      error: (error) => {
        console.error('Error al cargar los tipos de texturas', error);
      }
    });

    // Cargar tipos de dietas
    this.registroService.getTiposDietas().subscribe({
      next: (tipos: TipoDieta[]) => {
        this.tiposDietas = tipos;
      },
      error: (error) => {
        console.error('Error al cargar los tipos de dietas', error);
      }
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const registroData = {
        aux_id: this.auxiliarId,
        pac_id: this.pacienteId,
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
        },
      };

      this.registroService.createRegistro(registroData).subscribe({
        next: (response: RegistroResponse) => {
          const currentUrl = this.router.url;
          const modifiedUrl = currentUrl.split('/').slice(1, -2).join('/');
          this.router.navigate([modifiedUrl]);

        },
        error: (error) => {
          console.error('Error al crear el registro', error);
        }
      });
    }
  }
}