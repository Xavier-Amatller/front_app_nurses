import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { Drawer } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from '../../layout/service/layout.service';
import { Constantes, Diagnostico, Drenajes, HistoryData, Movilizaciones, Paciente } from '../../models/interfaces';
import { RegistroService } from '../../service/registro.service';
import { RoomsService } from '../../service/rooms.service';
@Component({
    selector: 'app-inside-room',
    standalone: true,
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule, ChartModule, FormsModule, InputTextModule, TabsModule, KnobModule, CheckboxModule, Button, Drawer, Dialog],
    animations: [trigger('fadeAnimation', [transition(':enter', [style({ opacity: 0 }), animate('600ms ease-in', style({ opacity: 1 }))]), transition(':leave', [animate('400ms ease-out', style({ opacity: 0 }))])])],

    template: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Columna de la izquierda -->
            <div class="col-span-1">
                <ng-container *ngIf="loading; else contentLeft">
                    <div @fadeAnimation class="flex flex-col gap-8">
                        <p-skeleton class="w-[100%] transition-all" height="1000px"></p-skeleton>
                    </div>
                </ng-container>
                <ng-template #contentLeft>
                    <div @fadeAnimation class="card">
                        <div class="width-full flex justify-between">
                            <h4>Ultims 7 dies</h4>
                            <div (click)="showDialog()" class="flex text-end gap-2 mb-2 text-[var(--primary-color)] hover:cursor-pointer">
                                <p class="font-sm">Ampliar gràfic</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="var(--primary-color)"
                                    stroke-width="1"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-window-maximize"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 16m0 1a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1z" />
                                    <path d="M4 12v-6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-6" />
                                    <path d="M12 8h4v4" />
                                    <path d="M16 8l-5 5" />
                                </svg>
                            </div>
                        </div>
                        <p-chart type="line" [data]="lineData" [options]="lineOptions"></p-chart>
                        <div @fadeAnimation class="font-semibold text-xl mt-12 mb-4 flex justify-between items-center">
                            <h5 class="w-[80%]">Ultimes dades registrades</h5>
                            <p-drawer [(visible)]="visibleLeft" class="!w-[20vw]" header="Historial">
                                <div
                                    *ngFor="let item of historyData"
                                    class="card border !p-0"
                                    [ngClass]="{
                                        'border-[var(--surface-border)]': selectedHistoryItem !== item,
                                        'border-[var(--primary-color)]': selectedHistoryItem === item
                                    }"
                                >
                                    <div class="card hover:cursor-pointer" (click)="viewHistoryData(item)">
                                        <h4 class="mb-0">Dia {{ item.reg_fecha }}</h4>
                                        <p class="mb-6 text-gray-600 text-lg">{{ item.reg_hora }}</p>
                                        <p>Pulsaciones {{ item.cv?.cv_pulso ?? '-' }} x min</p>
                                        <p>SYS: {{ item.cv?.cv_ta_sistolica ?? '-' }}</p>
                                        <p>DIA: {{ item.cv?.cv_ta_diastolica ?? '-' }}</p>
                                        <p>Saturación oxigeno: {{ item.cv?.cv_saturacion_oxigeno ?? '-' }}</p>
                                    </div>
                                </div>
                            </p-drawer>
                            <!-- Poner true el modal, si lo quieren con fondo oscuro -->
                            <p-dialog [modal]="false" [(visible)]="visible" [style]="{ width: '70rem' }" [maximizable]="true">
                                <p-chart class="chart-dialog-custom" [height]="'700px'" type="line" [data]="lineData" [options]="lineOptions"></p-chart>
                            </p-dialog>
                            <div class="flex gap-4 mb-2">
                                <p-button class="w-max" (click)="openCares(room[0]?.paciente?.pac_id)">Afegir curas</p-button>
                                <p-button class="w-max" (click)="openDiet()">Afegir dieta</p-button>
                            </div>
                        </div>
                        <div (click)="visibleLeft = true" class="flex gap-2 text-[var(--primary-color)] hover:cursor-pointer">
                            <p class="font-sm">Veure el historial</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--primary-color)"
                                stroke-width="1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-external-link"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                                <path d="M11 13l9 -9" />
                                <path d="M15 4h5v5" />
                            </svg>
                        </div>

                        <p-tabs value="0">
                            <p-tablist>
                                <p-tab value="0">Constants</p-tab>
                                <p-tab value="1">Drenatges</p-tab>
                                <p-tab value="2">Movilitzacions</p-tab>
                            </p-tablist>
                            <p-tabpanels>
                                <p-tabpanel value="0" class="flex flex-wrap gap-12 mt-4">
                                    <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                        <div class="font-semibold text-xl text-center">Puls</div>
                                        <p-knob [(ngModel)]="constantes.pulso" [readonly]="true" [step]="10" [min]="0" [max]="220" valueTemplate="{value}" />
                                    </div>
                                    <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                        <div class="font-semibold text-xl text-center">Temperatura</div>
                                        <p-knob [(ngModel)]="constantes.temperatura" [readonly]="true" [step]="10" [min]="0" [max]="42" valueTemplate="{value}°C" />
                                    </div>
                                    <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                        <div class="font-semibold text-xl text-center">Saturació d'oxigen</div>
                                        <p-knob [(ngModel)]="constantes.saturacion_oxigeno" [readonly]="true" [step]="10" [min]="0" [max]="100" valueTemplate="{value}%" />
                                    </div>
                                    <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                        <div class="font-semibold text-xl text-center">Frequencia respiratoria</div>
                                        <p-knob [(ngModel)]="constantes.frequencia_respiratoria" [readonly]="true" [step]="10" [min]="0" [max]="80" valueTemplate="{value}" />
                                    </div>
                                    <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                        <div class="font-semibold text-xl text-center">TA sistólica</div>
                                        <p-knob [(ngModel)]="constantes.ta_sistolica" [readonly]="true" [step]="10" [min]="0" [max]="180" valueTemplate="{value}" />
                                    </div>
                                    <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                        <div class="font-semibold text-xl text-center">TA diastólica</div>
                                        <p-knob [(ngModel)]="constantes.ta_diastolica" [readonly]="true" [step]="10" [min]="0" [max]="120" valueTemplate="{value}" />
                                    </div>
                                </p-tabpanel>
                                <p-tabpanel value="1">
                                    <div class="card flex flex-col gap-4">
                                        <div class="flex flex-col gap-2">
                                            <label for="dre_debito">Débito del Drenaje</label>
                                            <input [(ngModel)]="drenajes.dre_debito" type="text" pInputText [disabled]="true" class="w-full h-max" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label for="tdre_id">Tipo de Drenaje</label>
                                            <input [(ngModel)]="drenajes.tdre_desc" type="text" pInputText [disabled]="true" class="w-full h-max" />
                                        </div>
                                    </div>
                                </p-tabpanel>
                                <p-tabpanel value="2">
                                    <div class="card flex flex-col gap-4">
                                        <div class="flex justify-evenly gap-2">
                                            <div class="flex gap-2">
                                                <label for="mov_sedestacion">Sedestación</label>
                                                <p-checkbox [(ngModel)]="this.movilizaciones.mov_sedestacion" [binary]="true" [disabled]="true" inputId="mov_sedestacion" />
                                            </div>
                                            <div class="flex gap-2">
                                                <label for="mov_ajuda_deambulacion">Ayuda para Deambulación</label>
                                                <p-checkbox [(ngModel)]="this.movilizaciones.mov_ajuda_deambulacion" [binary]="true" [disabled]="true" inputId="mov_ajuda_deambulacion" />
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label for="mov_ajuda_descripcion">Descripción de la Ayuda</label>
                                            <input [(ngModel)]="this.movilizaciones.mov_ajuda_descripcion" type="text" pInputText [disabled]="true" class="w-full h-max" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label for="mov_cambios">Cambios Posturales</label>
                                            <input [(ngModel)]="this.movilizaciones.mov_cambios" type="text" pInputText [disabled]="true" class="w-full h-max" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label for="mov_decubitos">Decúbitos</label>
                                            <input [(ngModel)]="this.movilizaciones.mov_decubitos" type="text" pInputText [disabled]="true" class="w-full h-max" />
                                        </div>
                                    </div>
                                </p-tabpanel>
                            </p-tabpanels>
                        </p-tabs>
                    </div>
                </ng-template>
            </div>

            <!-- Columna de la derecha -->
            <div class="col-span-1">
                <ng-container *ngIf="loading; else contentRight">
                    <div @fadeAnimation class="flex flex-col gap-8">
                        <p-skeleton class="w-[100%] transition-all" height="630px"></p-skeleton>
                        <p-skeleton class="w-[100%] transition-all mt-4" height="128px"></p-skeleton>
                    </div>
                </ng-container>
                <ng-template #contentRight>
                    <div @fadeAnimation class="card flex flex-col gap-5">
                        <div class="font-semibold text-3xl">
                            <h2 class="mb-0">{{ paciente.pac_nombre + ' ' + paciente.pac_apellidos }}</h2>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid grid-cols-12 gap-4">
                                <label for="pac_edad" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Edad: </label>
                                <div class="col-span-12 md:col-span-9">
                                    <input pInputText [disabled]="true" id="pac_edad" type="number" [(ngModel)]="paciente.pac_edad" />
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-4">
                                <label for="pac_lengua_materna" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Lengua Materna: </label>
                                <div class="col-span-12 md:col-span-9">
                                    <input pInputText [disabled]="true" id="pac_lengua_materna" type="text" [(ngModel)]="paciente.pac_lengua_materna" />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="font-semibold text-xl mb-4">Informació del pacient</div>
                        <label for="pac_motiu_ingrees" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-4">Motiu d'ingrés:</label>
                        <div class="col-span-12 md:col-span-9 md:mb-4">
                            <input [(ngModel)]="this.diagnostico.dia_motivo" pInputText [disabled]="true" id="pac_motiu_ingrees" type="text" class="w-full min-h-20" />
                        </div>
                        <label for="pac_diagnostic" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-4">Diagnostic:</label>
                        <div class="col-span-12 md:col-span-9">
                            <input [(ngModel)]="this.diagnostico.dia_diagnostico" pInputText [disabled]="true" id="pac_diagnostic" type="text" class="w-full min-h-20" />
                        </div>
                        <hr />
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid grid-cols-12 gap-4">
                                <label for="pac_alergias" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Alergias: </label>
                                <div class="col-span-12 md:col-span-9">
                                    <input pInputText [disabled]="true" id="pac_alergias" type="text" [(ngModel)]="paciente.pac_alergias" />
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-4">
                                <label for="pac_antecedentes" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Antecedentes: </label>
                                <div class="col-span-12 md:col-span-9">
                                    <input pInputText [disabled]="true" id="pac_antecedentes" type="text" [(ngModel)]="paciente.pac_antecedentes" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="font-semibold text-xl mb-4">Informació del cuidador</div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid grid-cols-12 gap-4">
                                <label for="pac_nombre_cuidador" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Nom: </label>
                                <div class="col-span-12 md:col-span-9">
                                    <input pInputText [disabled]="true" id="pac_nombre_cuidador" type="text" [(ngModel)]="paciente.pac_nombre_cuidador" />
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-4">
                                <label for="pac_telefono_cuidador" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Num Telefon:</label>
                                <div class="col-span-12 md:col-span-9">
                                    <input pInputText [disabled]="true" id="pac_telefono_cuidador" type="text" [(ngModel)]="paciente.pac_telefono_cuidador" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </div>
        </div>
    `
})
export class InsideRooms implements OnInit {
    selectedHistoryItem: any = null;
    visibleLeft: boolean = false;
    visible: boolean = false;
    historyData: HistoryData[] = [];
    loading: boolean = true; // Added loading state
    room_id: string | null = null;
    room: any[] = [];

    paciente: Paciente = {
        pac_alergias: '',
        pac_antecedentes: '',
        pac_apellidos: '',
        pac_direccion_completa: '',
        pac_edad: 0,
        pac_fecha_ingreso: '',
        pac_fecha_nacimiento: '',
        pac_id: 0,
        pac_lengua_materna: '',
        pac_nombre: '',
        pac_nombre_cuidador: '',
        pac_num_historial: 0,
        pac_telefono_cuidador: ''
    };
    constantes: Constantes = {
        ta_sistolica: null,
        ta_diastolica: null,
        frequencia_respiratoria: null,
        pulso: null,
        temperatura: null,
        saturacion_oxigeno: null,
        talla: null,
        diuresis: null,
        deposiciones: null,
        stp: null
    };
    movilizaciones: Movilizaciones = {
        mov_ajuda_deambulacion: null,
        mov_ajuda_descripcion: null,
        mov_cambios: null,
        mov_decubitos: null,
        mov_sedestacion: null
    };
    drenajes: Drenajes = {
        dre_debito: null,
        tdre_desc: null
    };
    diagnostico: Diagnostico = {
        dia_diagnostico: null,
        dia_motivo: null
    };
    lineData: any;
    lineOptions: any;

    subscription: Subscription;

    constructor(
        private readonly rs: RoomsService,
        private readonly regs: RegistroService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly layoutService: LayoutService
    ) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {});
    }

    ngOnInit(): void {
        this.room_id = this.route.snapshot.paramMap.get('id');

        if (!this.room_id) {
            this.router.navigate(['/habitacions']);
            return;
        }

        this.rs.getRoom(this.room_id).subscribe({
            next: (data: any) => {
                this.room = data;
                this.paciente = {
                    pac_alergias: this.room[0].paciente.pac_alergias,
                    pac_antecedentes: this.room[0].paciente.pac_antecedentes,
                    pac_apellidos: this.room[0].paciente.pac_apellidos,
                    pac_direccion_completa: this.room[0].paciente.pac_direccion_completa,
                    pac_edad: this.room[0].paciente.pac_edad,
                    pac_fecha_ingreso: this.room[0].paciente.pac_fecha_ingreso,
                    pac_fecha_nacimiento: this.room[0].paciente.pac_fecha_nacimiento,
                    pac_id: this.room[0].paciente.pac_id,
                    pac_lengua_materna: this.room[0].paciente.pac_lengua_materna,
                    pac_nombre: this.room[0].paciente.pac_nombre,
                    pac_nombre_cuidador: this.room[0].paciente.pac_nombre_cuidador,
                    pac_num_historial: this.room[0].paciente.pac_num_historial,
                    pac_telefono_cuidador: this.room[0].paciente.pac_telefono_cuidador
                };

                this.regs.getHistory(this.room[0].paciente.pac_id).subscribe({
                    next: (data: any) => {
                        this.historyData = data.map((item: any) => {
                            let fecha = null;
                            let hora = null;
                            if (item.reg_timestamp) {
                                const [f, h] = item.reg_timestamp.split(' ');
                                fecha = f;
                                hora = h;
                            }
                            return {
                                ...item,
                                reg_fecha: fecha,
                                reg_hora: hora
                            };
                        });
                    },
                    error: (err) => {
                        if (err.status === 404) {
                            this.historyData = [];
                        } else {
                            console.error('Error fetching history:', err);
                        }
                    }
                });

                this.regs.getLastRegistro(this.room[0].paciente.pac_id).subscribe({
                    next: (data: any) => {
                        try {
                            this.constantes = {
                                ta_sistolica: data.lastRegistro.cv.cv_ta_sistolica ? parseInt(data.lastRegistro.cv.cv_ta_sistolica) : null,
                                ta_diastolica: data.lastRegistro.cv.cv_ta_diastolica ? parseInt(data.lastRegistro.cv.cv_ta_diastolica) : null,
                                frequencia_respiratoria: data.lastRegistro.cv.cv_frequencia_respiratoria ? parseInt(data.lastRegistro.cv.cv_frequencia_respiratoria) : null,
                                pulso: data.lastRegistro.cv.cv_pulso ? parseInt(data.lastRegistro.cv.cv_pulso) : null,
                                temperatura: data.lastRegistro.cv.cv_temperatura ? parseFloat(data.lastRegistro.cv.cv_temperatura) : null,
                                saturacion_oxigeno: data.lastRegistro.cv.cv_saturacion_oxigeno ? parseInt(data.lastRegistro.cv.cv_saturacion_oxigeno) : null,
                                talla: data.lastRegistro.cv.cv_talla ? parseInt(data.lastRegistro.cv.cv_talla) : null,
                                diuresis: data.lastRegistro.cv.cv_diuresis ? parseInt(data.lastRegistro.cv.cv_diuresis) : null,
                                deposiciones: data.lastRegistro.cv.cv_deposiciones || null,
                                stp: data.lastRegistro.cv.cv_stp || null
                            };
                        } catch (error) {
                            console.log('No hay registros: constantes vitales');
                        }

                        try {
                            this.movilizaciones = {
                                mov_ajuda_deambulacion: data.lastRegistro.mov.mov_ajuda_deambulacion ? data.lastRegistro.mov.mov_ajuda_deambulacion : false,
                                mov_ajuda_descripcion: data.lastRegistro.mov.mov_ajuda_descripcion ?? null,
                                mov_cambios: data.lastRegistro.mov.mov_cambios ?? null,
                                mov_decubitos: data.lastRegistro.mov.mov_decubitos ?? null,
                                mov_sedestacion: data.lastRegistro.mov.mov_sedestacion ? data.lastRegistro.mov.mov_sedestacion : false
                            };
                        } catch (error) {
                            console.log('No hay registros: movilizaciones');
                        }

                        try {
                            this.drenajes = {
                                dre_debito: data.lastRegistro.dre.dre_debito ?? null,
                                tdre_desc: data.lastRegistro.dre.tdre_desc ?? null
                            };
                        } catch (error) {
                            console.log('No hay registros: drenajes');
                        }

                        try {
                            this.diagnostico = {
                                dia_diagnostico: data.lastRegistro.dia.dia_diagnostico ?? null,
                                dia_motivo: data.lastRegistro.dia.dia_motivo ?? null
                            };
                        } catch (error) {
                            console.log('No hay registros: diagnostico');
                        }

                        this.loading = false; // Set loading to false after all data is fetched
                    },
                    error: (err) => {
                        if (err.status === 404) {
                            this.constantes = {
                                ta_sistolica: null,
                                ta_diastolica: null,
                                frequencia_respiratoria: null,
                                pulso: null,
                                temperatura: null,
                                saturacion_oxigeno: null,
                                talla: null,
                                diuresis: null,
                                deposiciones: null,
                                stp: null
                            };
                            this.movilizaciones = {
                                mov_ajuda_deambulacion: null,
                                mov_ajuda_descripcion: null,
                                mov_cambios: null,
                                mov_decubitos: null,
                                mov_sedestacion: null
                            };
                            this.drenajes = {
                                dre_debito: null,
                                tdre_desc: null
                            };
                            this.diagnostico = {
                                dia_diagnostico: null,
                                dia_motivo: null
                            };
                        } else {
                            console.error('Error fetching last registro:', err);
                        }
                        this.loading = false;
                    }
                });

                this.regs.getChartData(this.room[0].paciente.pac_id).subscribe((data: any) => {
                    const chartLabels = data.map((item: any) => item.label);

                    const chartData = data.map((item: any) => ({
                        ta_sistolica: item.ta_sistolica ? parseInt(item.ta_sistolica) : null,
                        ta_diastolica: item.ta_diastolica ? parseInt(item.ta_diastolica) : null,
                        frecuencia_respiratoria: item.frecuencia_respiratoria ? parseInt(item.frecuencia_respiratoria) : null,
                        pulso: item.pulso ? parseInt(item.pulso) : null,
                        temperatura: item.temperatura ? parseFloat(item.temperatura) : null,
                        saturacion_oxigeno: item.saturacion_oxigeno ? parseInt(item.saturacion_oxigeno) : null
                    }));

                    this.initChart(chartLabels, chartData);
                });
            },
            error: (err) => {
                if (err.status === 404) {
                    this.room = [];
                    this.paciente = {
                        pac_alergias: '',
                        pac_antecedentes: '',
                        pac_apellidos: '',
                        pac_direccion_completa: '',
                        pac_edad: 0,
                        pac_fecha_ingreso: '',
                        pac_fecha_nacimiento: '',
                        pac_id: 0,
                        pac_lengua_materna: '',
                        pac_nombre: '',
                        pac_nombre_cuidador: '',
                        pac_num_historial: 0,
                        pac_telefono_cuidador: ''
                    };
                    this.historyData = [];
                    this.constantes = {
                        ta_sistolica: null,
                        ta_diastolica: null,
                        frequencia_respiratoria: null,
                        pulso: null,
                        temperatura: null,
                        saturacion_oxigeno: null,
                        talla: null,
                        diuresis: null,
                        deposiciones: null,
                        stp: null
                    };
                    this.movilizaciones = {
                        mov_ajuda_deambulacion: null,
                        mov_ajuda_descripcion: null,
                        mov_cambios: null,
                        mov_decubitos: null,
                        mov_sedestacion: null
                    };
                    this.drenajes = {
                        dre_debito: null,
                        tdre_desc: null
                    };
                    this.diagnostico = {
                        dia_diagnostico: null,
                        dia_motivo: null
                    };
                } else {
                    console.error('Error fetching room:', err);
                }
                this.loading = false;
            }
        });
    }

    openCares(pac_id: number) {
        this.router.navigate(['habitacions/' + this.room_id + '/curas/', pac_id]);
    }

    openDiet() {
        this.router.navigate(['habitacions/' + this.room_id + '/dietes/', this.room_id]);
    }

    viewHistoryData(item: HistoryData) {
        this.selectedHistoryItem = item;
        this.constantes = {
            ta_sistolica: item.cv?.cv_ta_sistolica ? parseInt(item.cv.cv_ta_sistolica as string) : null,
            ta_diastolica: item.cv?.cv_ta_diastolica ? parseInt(item.cv.cv_ta_diastolica as string) : null,
            frequencia_respiratoria: item.cv?.cv_frequencia_respiratoria ? parseInt(item.cv.cv_frequencia_respiratoria as string) : null,
            pulso: item.cv?.cv_pulso ? parseInt(item.cv.cv_pulso as string) : null,
            temperatura: item.cv?.cv_temperatura ? parseFloat(item.cv.cv_temperatura as string) : null,
            saturacion_oxigeno: item.cv?.cv_saturacion_oxigeno ? parseInt(item.cv.cv_saturacion_oxigeno as string) : null,
            talla: item.cv?.cv_talla ? parseInt(item.cv.cv_talla as string) : null,
            diuresis: item.cv?.cv_diuresis ? parseInt(item.cv.cv_diuresis as string) : null,
            deposiciones: item.cv?.cv_deposiciones || null,
            stp: item.cv?.cv_stp || null
        };
        this.drenajes = {
            dre_debito: item.dre?.dre_debito ?? null,
            tdre_desc: item.dre?.tdre_desc ?? null
        };
        this.diagnostico = {
            dia_diagnostico: item.dia?.dia_diagnostico ?? null,
            dia_motivo: item.dia?.dia_motivo ?? null
        };
        this.movilizaciones = {
            mov_ajuda_deambulacion: item.mov?.mov_ajuda_deambulacion ?? false,
            mov_ajuda_descripcion: item.mov?.mov_ajuda_descripcion ?? null,
            mov_cambios: item.mov?.mov_cambios ?? null,
            mov_decubitos: item.mov?.mov_decubitos ?? null,
            mov_sedestacion: item.mov?.mov_sedestacion ?? false
        };
    }
    showDialog() {
        this.visible = true;
    }
    initChart(chartLabels: string[], chartData: any[]) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color-secondary'   );
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const chartDataPulso = chartData.map((item: any) => item.pulso);
        const chartDataTemperatura = chartData.map((item: any) => item.temperatura);
        const chartDataSaturacion = chartData.map((item: any) => item.saturacion_oxigeno);
        const chartDataFrecuencia = chartData.map((item: any) => item.frecuencia_respiratoria);
        const chartDataTASistolica = chartData.map((item: any) => item.ta_sistolica);
        const chartDataTADiastolica = chartData.map((item: any) => item.ta_diastolica);

        this.lineData = {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Puls',
                    data: chartDataPulso,
                    fill: false,
                    backgroundColor: '#FF6384',
                    borderColor: '#FF6384',
                    tension: 0.4
                },
                {
                    label: 'Temperatura (°C)',
                    data: chartDataTemperatura,
                    fill: false,
                    backgroundColor: '#FFCE56',
                    borderColor: '#FFCE56',
                    tension: 0.4
                },
                {
                    label: "Saturació d'oxigen (%)",
                    data: chartDataSaturacion,
                    fill: false,
                    backgroundColor: '#36A2EB',
                    borderColor: '#36A2EB',
                    tension: 0.4
                },
                {
                    label: 'Frequencia respiratoria',
                    data: chartDataFrecuencia,
                    fill: false,
                    backgroundColor: '#4BC0C0',
                    borderColor: '#4BC0C0',
                    tension: 0.4
                },
                {
                    label: 'TA sistólica',
                    data: chartDataTASistolica,
                    fill: false,
                    backgroundColor: '#9966FF',
                    borderColor: '#9966FF',
                    tension: 0.4
                },
                {
                    label: 'TA diastólica',
                    data: chartDataTADiastolica,
                    fill: false,
                    backgroundColor: '#FF9F40',
                    borderColor: '#FF9F40',
                    tension: 0.4
                }
            ]
        };

        this.lineOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.7,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        callback: (val: any, index: number) => {
                            const fullLabel = this.lineData.labels[index];
                            return fullLabel.split('(')[0].trim();
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    /* initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.lineData = {
            labels: [
                'Dilluns Matí',
                'Dilluns Migdia',
                'Dilluns Nit',
                'Dimarts Matí',
                'Dimarts Migdia',
                'Dimarts Nit',
                'Dimecres Matí',
                'Dimecres Migdia',
                'Dimecres Nit',
                'Dijous Matí',
                'Dijous Migdia',
                'Dijous Nit',
                'Divendres Matí',
                'Divendres Migdia',
                'Divendres Nit',
                'Dissabte Matí',
                'Dissabte Migdia',
                'Dissabte Nit',
                'Diumenge Matí',
                'Diumenge Migdia',
                'Diumenge Nit'
            ],
            datasets: [
                {
                    label: 'Puls',
                    data: [72, 74, 73, 85, 87, 86, 78, 79, 77, 90, 92, 91, 76, 75, 74, 74, 73, 72, 73, 74, 75],
                    fill: false,
                    backgroundColor: '#FF6384',
                    borderColor: '#FF6384',
                    tension: 0.4
                },
                {
                    label: 'Temperatura (°C)',
                    data: [36.5, 36.6, 36.5, 36.6, 36.7, 36.6, 36.7, 36.8, 36.7, 37.2, 37.3, 37.2, 36.6, 36.5, 36.6, 36.5, 36.4, 36.5, 36.4, 36.5, 36.6],
                    fill: false,
                    backgroundColor: '#FFCE56',
                    borderColor: '#FFCE56',
                    tension: 0.4
                },
                {
                    label: "Saturació d'oxigen (%)",
                    data: [98, 97, 98, 97, 96, 97, 96, 95, 96, 92, 91, 92, 96, 97, 96, 97, 98, 97, 98, 97, 96],
                    fill: false,
                    backgroundColor: '#36A2EB',
                    borderColor: '#36A2EB',
                    tension: 0.4
                },
                {
                    label: 'Frequencia respiratoria',
                    data: [16, 17, 16, 17, 18, 17, 18, 19, 18, 20, 21, 20, 18, 17, 18, 17, 16, 17, 16, 17, 18],
                    fill: false,
                    backgroundColor: '#4BC0C0',
                    borderColor: '#4BC0C0',
                    tension: 0.4
                },
                {
                    label: 'TA sistólica',
                    data: [120, 121, 120, 122, 123, 122, 118, 119, 118, 140, 141, 140, 119, 120, 119, 120, 121, 120, 121, 122, 121],
                    fill: false,
                    backgroundColor: '#9966FF',
                    borderColor: '#9966FF',
                    tension: 0.4
                },
                {
                    label: 'TA diastólica',
                    data: [80, 81, 80, 82, 83, 82, 78, 79, 78, 95, 96, 95, 79, 80, 79, 80, 81, 80, 81, 82, 81],
                    fill: false,
                    backgroundColor: '#FF9F40',
                    borderColor: '#FF9F40',
                    tension: 0.4
                }
            ]
        };

        this.lineOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    } */
}
