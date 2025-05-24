import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Tag } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { RegistroResponse, TipoDieta, TipoDrenaje, TipoTextura } from '../../models/interfaces';
import { AuthService } from '../../service/auth.service';
import { RegistroService } from '../../service/registro.service';
@Component({
    selector: 'app-cares',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, InputNumberModule, DatePickerModule, TextareaModule, CheckboxModule, DropdownModule, MultiSelectModule, Tag, Toast, Dialog],
    providers: [AuthService, MessageService, ConfirmationService],
    animations: [trigger('tagAnimation', [transition(':enter', [style({ opacity: 0 }), animate('300ms 500ms ease-in', style({ opacity: 1 }))]), transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))])])],

    template: `
        <div>
            <p-toast position="top-right"></p-toast>
            <form class="flex flex-col-2 gap-8" [formGroup]="registroForm" (ngSubmit)="onSubmit(this.alertsChecked)">
                <div class="md:w-1/2">
                    <!-- Constantes Vitales -->
                    <div class="card flex flex-col gap-4">
                        <div class="font-semibold text-xl">Constantes Vitales</div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_ta_sistolica" class="h-6 flex gap-6">
                                <p class="flex flex-col justify-center">Tensión Arterial Sistólica</p>
                                <span
                                    @tagAnimation
                                    *ngIf="registroForm.get('cv_ta_sistolica')?.value && (registroForm.get('cv_ta_sistolica')?.value > 140 || registroForm.get('cv_ta_sistolica')?.value < 90) && registroForm.get('cv_ta_sistolica')?.touched"
                                >
                                    <p-tag class="h-6" icon="pi pi-times" severity="danger" value="Perill"></p-tag>
                                </span>
                            </label>
                            <p-inputnumber
                                formControlName="cv_ta_sistolica"
                                mode="decimal"
                                [useGrouping]="false"
                                [min]="0"
                                [max]="300"
                                [ngClass]="{
                                    'border-red-500': registroForm.get('cv_ta_sistolica')?.invalid && registroForm.get('cv_ta_sistolica')?.touched
                                }"
                                [placeholder]="'Max 140 mmHg - Min 90 mmHg'"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_ta_diastolica" class="h-6 flex gap-6">
                                <p class="flex flex-col justify-center">Tensión Arterial Diastólica</p>
                                <span
                                    @tagAnimation
                                    *ngIf="registroForm.get('cv_ta_diastolica')?.value && (registroForm.get('cv_ta_diastolica')?.value >= 90 || registroForm.get('cv_ta_diastolica')?.value < 50) && registroForm.get('cv_ta_diastolica')?.touched"
                                >
                                    <p-tag class="h-6" icon="pi pi-times" severity="danger" value="Perill"></p-tag>
                                </span>
                            </label>
                            <p-inputnumber
                                formControlName="cv_ta_diastolica"
                                mode="decimal"
                                [useGrouping]="false"
                                [min]="0"
                                [max]="200"
                                [ngClass]="{
                                    'border-red-500': registroForm.get('cv_ta_diastolica')?.invalid && registroForm.get('cv_ta_diastolica')?.touched
                                }"
                                [placeholder]="'Max 90 mmHg - Min 50 mmHg'"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_pulso" class="h-6 flex gap-6">
                                <p class="flex flex-col justify-center">Pulso</p>
                                <span @tagAnimation *ngIf="registroForm.get('cv_pulso')?.value && (registroForm.get('cv_pulso')?.value > 100 || registroForm.get('cv_pulso')?.value < 50) && registroForm.get('cv_pulso')?.touched">
                                    <p-tag class="h-6" icon="pi pi-times" severity="danger" value="Perill"></p-tag>
                                </span>
                            </label>
                            <p-inputnumber
                                formControlName="cv_pulso"
                                mode="decimal"
                                [useGrouping]="false"
                                [min]="0"
                                [max]="200"
                                [ngClass]="{
                                    'border-red-500': registroForm.get('cv_pulso')?.invalid && registroForm.get('cv_pulso')?.touched
                                }"
                                [placeholder]="'Max 100 bpm - Min 50 bpm'"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_frecuencia_respiratoria" class="h-6 flex gap-6">
                                <p class="flex flex-col justify-center">Frecuencia Respiratoria</p>
                                <span
                                    @tagAnimation
                                    *ngIf="
                                        registroForm.get('cv_frecuencia_respiratoria')?.value &&
                                        (registroForm.get('cv_frecuencia_respiratoria')?.value > 20 || registroForm.get('cv_frecuencia_respiratoria')?.value < 12) &&
                                        registroForm.get('cv_frecuencia_respiratoria')?.touched
                                    "
                                >
                                    <p-tag class="h-6" icon="pi pi-times" severity="danger" value="Perill"></p-tag>
                                </span>
                            </label>
                            <p-inputnumber
                                formControlName="cv_frecuencia_respiratoria"
                                mode="decimal"
                                [useGrouping]="false"
                                [min]="0"
                                [max]="100"
                                [ngClass]="{
                                    'border-red-500': registroForm.get('cv_frecuencia_respiratoria')?.invalid && registroForm.get('cv_frecuencia_respiratoria')?.touched
                                }"
                                [placeholder]="'Max 20 rpm - Min 12 rpm'"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_temperatura" class="h-6 flex gap-6">
                                <p class="flex flex-col justify-center">Temperatura (°C)</p>
                                <span
                                    @tagAnimation
                                    *ngIf="registroForm.get('cv_temperatura')?.value && (registroForm.get('cv_temperatura')?.value > 38.5 || registroForm.get('cv_temperatura')?.value < 34.9) && registroForm.get('cv_temperatura')?.touched"
                                >
                                    <p-tag class="h-6" icon="pi pi-times" severity="danger" value="Perill"></p-tag>
                                </span>
                            </label>
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
                                [placeholder]="'Max 38.5 °C - Min 34.9 °C'"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cv_saturacion_oxigeno" class="h-6 flex gap-6">
                                <p class="flex flex-col justify-center">Saturación de Oxígeno (%)</p>
                                <span @tagAnimation *ngIf="registroForm.get('cv_saturacion_oxigeno')?.value && registroForm.get('cv_saturacion_oxigeno')?.value < 94 && registroForm.get('cv_saturacion_oxigeno')?.touched">
                                    <p-tag class="h-6" icon="pi pi-times" severity="danger" value="Perill"></p-tag>
                                </span>
                            </label>
                            <p-inputnumber
                                formControlName="cv_saturacion_oxigeno"
                                mode="decimal"
                                [useGrouping]="false"
                                [min]="0"
                                [max]="100"
                                [ngClass]="{
                                    'border-red-500': registroForm.get('cv_saturacion_oxigeno')?.invalid && registroForm.get('cv_saturacion_oxigeno')?.touched
                                }"
                                [placeholder]="'Min 94%'"
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
                                pTextarea
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
                                pTextarea
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
                                pTextarea
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
                                pTextarea
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
                                pTextarea
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
                                pTextarea
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
                    <p-dialog header="Alertes!" [(visible)]="displayConfirmation" [style]="{ width: '350px' }" [modal]="true">
                    <div class="flex items-center justify-center">
                        <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem"> </i>
                        <span>Hi ha alertes, el pacient pot estar en perill. ¿Estás segur de que vols continuar?</span>
                    </div>
                    <ng-template #footer>
                        <p-button label="No" icon="pi pi-times" (click)="closeConfirmation()" text severity="secondary" />
                        <p-button label="Sí" icon="pi pi-check" (click)="closeAndSendConfirmation()" severity="danger" outlined autofocus />
                    </ng-template>
                </p-dialog>
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

    displayConfirmation: boolean = false;
    hasAlert: boolean = false; // Variable para controlar la alerta
    alertsChecked = false;

    constructor(
        private readonly fb: FormBuilder,
        private readonly registroService: RegistroService,
        private readonly router: Router,
        private readonly AuthService: AuthService,
        private readonly route: ActivatedRoute,
        private readonly messageService: MessageService,
        private confirmationService: ConfirmationService
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
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al carregar els tipus de drenatges'
                });
            }
        });

        // Cargar tipos de texturas
        this.registroService.getTiposTexturas().subscribe({
            next: (tipos: TipoTextura[]) => {
                this.tiposTexturas = tipos;
            },
            error: (error) => {
                console.error('Error al cargar los tipos de texturas', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar los tipos de texturas'
                });
            }
        });

        // Cargar tipos de dietas
        this.registroService.getTiposDietas().subscribe({
            next: (tipos: TipoDieta[]) => {
                this.tiposDietas = tipos;
            },
            error: (error) => {
                console.error('Error al cargar los tipos de dietas', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar los tipos de dietas'
                });
            }
        });

        // Observa cambios en el formulario para actualizar hasAlert
        this.registroForm.valueChanges.subscribe(() => {
            this.checkAlert();
        });
    }

    onSubmit($alertsChecked: boolean): void {
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
                }
            };

            this.registroForm.valueChanges.subscribe(() => {
                this.checkAlert();
            });

            if (!$alertsChecked) {
                 if(this.hasAlert) {
                this.openConfirmation();
                return;
            }
            }
           
            this.registroService.createRegistro(registroData).subscribe({
                next: (response: RegistroResponse) => {
                    const currentUrl = this.router.url;
                    const modifiedUrl = currentUrl.split('/').slice(1, -2).join('/');
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Registre realitzat',
                        detail: "El registre s'ha creat correctament"
                    });
                    setTimeout(() => {
                        this.router.navigate([modifiedUrl]);
                    }, 3000);
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al crear el registre'
                    });
                }
            });
        }
    }

    checkAlert(): void {
        const sistolica = this.registroForm.get('cv_ta_sistolica')?.value;
        const diastolica = this.registroForm.get('cv_ta_diastolica')?.value;
        const pulso = this.registroForm.get('cv_pulso')?.value;
        const frecuencia = this.registroForm.get('cv_frecuencia_respiratoria')?.value;
        const temperatura = this.registroForm.get('cv_temperatura')?.value;
        const saturacion = this.registroForm.get('cv_saturacion_oxigeno')?.value;


        this.hasAlert =
            (sistolica && (sistolica > 140 || sistolica < 90) && this.registroForm.get('cv_ta_sistolica')?.touched) ||
            (diastolica && (diastolica >= 90 || diastolica < 50) && this.registroForm.get('cv_ta_diastolica')?.touched) ||
            (pulso && (pulso > 100 || pulso < 50) && this.registroForm.get('cv_pulso')?.touched) ||
            (frecuencia && (frecuencia > 20 || frecuencia < 12) && this.registroForm.get('cv_frecuencia_respiratoria')?.touched) ||
            (temperatura && (temperatura > 38.5 || temperatura < 34.9) && this.registroForm.get('cv_temperatura')?.touched) ||
            (saturacion && saturacion < 94 && this.registroForm.get('cv_saturacion_oxigeno')?.touched);
    }
    openConfirmation() {
        this.displayConfirmation = true;
    }

    closeConfirmation() {
        this.displayConfirmation = false;
    }
    closeAndSendConfirmation(){
        this.displayConfirmation = false;
        this.alertsChecked = true;
        this.onSubmit(this.alertsChecked);
    }
}
