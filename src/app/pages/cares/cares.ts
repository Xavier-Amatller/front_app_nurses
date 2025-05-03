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
import { TipoDrenaje, RegistroResponse, TipoTextura, TipoDieta } from '../../models/interfaces';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
    selector: 'app-cares',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, InputNumberModule, DatePickerModule, TextareaModule, CheckboxModule, DropdownModule, MultiSelectModule],
    providers: [AuthService],
    template: `
        <div>
            <form class="flex flex-col-2  gap-8" [formGroup]="registroForm" (ngSubmit)="onSubmit()">
                <div class="md:w-1/2">
                    <!-- Constantes Vitales -->
                    <div class="card flex flex-col gap-4">
                        <div class="font-semibold text-xl">Constantes Vitales</div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_ta_sistolica">Tensión Arterial Sistólica</label>
                            <p-inputnumber formControlName="cv_ta_sistolica" mode="decimal" [useGrouping]="false" [min]="0" [max]="300" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_ta_diastolica">Tensión Arterial Diastólica</label>
                            <p-inputnumber formControlName="cv_ta_diastolica" mode="decimal" [useGrouping]="false" [min]="0" [max]="200" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_pulso">Pulso</label>
                            <p-inputnumber formControlName="cv_pulso" mode="decimal" [useGrouping]="false" [min]="0" [max]="200" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_frecuencia_respiratoria">Frecuencia Respiratoria</label>
                            <p-inputnumber formControlName="cv_frecuencia_respiratoria" mode="decimal" [useGrouping]="false" [min]="0" [max]="100" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_temperatura">Temperatura (°C)</label>
                            <p-inputnumber formControlName="cv_temperatura" mode="decimal" [useGrouping]="false" [min]="30" [max]="45" [step]="0.1" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_saturacion_oxigeno">Saturación de Oxígeno (%)</label>
                            <p-inputnumber formControlName="cv_saturacion_oxigeno" mode="decimal" [useGrouping]="false" [min]="0" [max]="100" />
                        </div>
                    </div>

                    <!-- Movilizaciones -->
                    <div class="card flex flex-col gap-4">
                        <div class="font-semibold text-xl">Movilizaciones</div>
                        <div class="flex flex-col gap-2">
                            <label for="mov_sedestacion">Sedestación</label>
                            <p-checkbox formControlName="mov_sedestacion" [binary]="true" inputId="mov_sedestacion" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="mov_ajuda_deambulacion">Ayuda para Deambulación</label>
                            <p-checkbox formControlName="mov_ajuda_deambulacion" [binary]="true" inputId="mov_ajuda_deambulacion" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="mov_ajuda_descripcion">Descripción de la Ayuda</label>
                            <textarea formControlName="mov_ajuda_descripcion" rows="3" pInputTextarea></textarea>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="mov_cambios">Cambios Posturales</label>
                            <textarea formControlName="mov_cambios" rows="3" pInputTextarea></textarea>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="mov_decubitos">Decúbitos</label>
                            <input type="text" formControlName="mov_decubitos" pInputText maxlength="45" />
                        </div>
                    </div>
                </div>
                <div class="md:w-1/2">
                    <!-- Diagnóstico -->
                    <div class="card flex flex-col gap-4">
                        <div class="font-semibold text-xl">Diagnóstico</div>
                        <div class="flex flex-col gap-2">
                            <label for="dia_diagnostico">Diagnóstico</label>
                            <textarea formControlName="dia_diagnostico" rows="3" pInputTextarea></textarea>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="dia_motivo">Motivo del Diagnóstico</label>
                            <textarea formControlName="dia_motivo" rows="3" pInputTextarea></textarea>
                        </div>
                    </div>

                    <!-- Drenajes -->
                    <div class="card flex flex-col gap-4">
                        <div class="font-semibold text-xl">Drenajes</div>
                        <div class="flex flex-col gap-2">
                            <label for="dre_debito">Débito del Drenaje</label>
                            <textarea formControlName="dre_debito" rows="3" pInputTextarea></textarea>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="tdre_id">Tipo de Drenaje</label>
                            <p-dropdown formControlName="tdre_id" [options]="tiposDrenajes" optionLabel="tdre_desc" optionValue="id" placeholder="Selecciona un tipo de drenaje" [showClear]="true" />
                        </div>
                    </div>
                    <!-- Dietas -->
                    <div class="card flex flex-col gap-4">
                        <div class="font-semibold text-xl">Dietas</div>
                        <div class="flex flex-col gap-2">
                            <label for="die_ttext">Textura de la Dieta</label>
                            <p-dropdown formControlName="die_ttext" [options]="tiposTexturas" optionLabel="ttex_desc" optionValue="id" placeholder="Selecciona una textura" [showClear]="true" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="tipos_dietas">Tipos de Dieta</label>
                            <p-multiSelect formControlName="tipos_dietas" [options]="tiposDietas" optionLabel="tdie_desc" optionValue="id" placeholder="Selecciona los tipos de dieta" [showClear]="true" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="die_autonomo">¿Es Autónomo?</label>
                            <p-checkbox formControlName="die_autonomo" [binary]="true" inputId="die_autonomo" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="die_protesi">¿Tiene Prótesis?</label>
                            <p-checkbox formControlName="die_protesi" [binary]="true" inputId="die_protesi" />
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
                </div>
            </form>
        </div>
    `
})
export class Cares implements OnInit {
    registroForm: FormGroup;
    auxiliarId: string | null = null;
    tiposDrenajes: TipoDrenaje[] = [];
    tiposTexturas: TipoTextura[] = [];
    tiposDietas: TipoDieta[] = [];

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
            die_ttext: [null],
            tipos_dietas: [[]],
            die_autonomo: [null],
            die_protesi: [null],
            Reg_Fecha: [new Date(), Validators.required],
            Reg_Obs: ['']
        });

        // Añadir validación condicional para tdre_id
        this.registroForm.get('dre_debito')?.valueChanges.subscribe((dreDebito) => {
            const tdreIdControl = this.registroForm.get('tdre_id');
            if (dreDebito) {
                tdreIdControl?.setValidators(Validators.required);
            } else {
                tdreIdControl?.clearValidators();
            }
            tdreIdControl?.updateValueAndValidity();
        });

        // Validación condicional para dietas
        this.registroForm.get('die_ttext')?.valueChanges.subscribe((dieTText) => {
            const tiposDietasControl = this.registroForm.get('tipos_dietas');
            const dieAutonomoControl = this.registroForm.get('die_autonomo');
            const dieProtesiControl = this.registroForm.get('die_protesi');

            if (dieTText) {
                tiposDietasControl?.setValidators([Validators.required, Validators.minLength(1)]);
                dieAutonomoControl?.setValidators(Validators.required);
                dieProtesiControl?.setValidators(Validators.required);
            } else {
                tiposDietasControl?.clearValidators();
                dieAutonomoControl?.clearValidators();
                dieProtesiControl?.clearValidators();
            }

            tiposDietasControl?.updateValueAndValidity();
            dieAutonomoControl?.updateValueAndValidity();
            dieProtesiControl?.updateValueAndValidity();
        });
    }
    ngOnInit(): void {
        this.auxiliarId = this.AuthService.getAuxiliarId();
        if (!this.auxiliarId) {
            console.error('No se encontró el ID del auxiliar. Redirigiendo al login...');
            this.router.navigate(['/login']);
            return;
        }
        //Cargar tipos de drenajes
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
                },
                dieta: {
                    die_ttext: this.registroForm.value.die_ttext,
                    tipos_dietas: this.registroForm.value.tipos_dietas,
                    die_autonomo: this.registroForm.value.die_autonomo,
                    die_protesi: this.registroForm.value.die_protesi
                }
            };

            console.log(registroData);

            this.registroService.createRegistro(registroData).subscribe({
                next: (response: RegistroResponse) => {
                    console.log('Registro creado con éxito', response);
                    const currentUrl = this.router.url;
                    const modifiedUrl = currentUrl.split('/').slice(1, -2).join('/');
                    console.log('Modified URL:', modifiedUrl);
                    this.router.navigate([modifiedUrl]);
                },
                error: (error) => {
                    console.error('Error al crear el registro', error);
                }
            });
        }
    }
}
