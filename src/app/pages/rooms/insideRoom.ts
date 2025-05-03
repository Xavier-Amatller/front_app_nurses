import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from '../../layout/service/layout.service';
import { RoomsService } from '../../service/rooms.service';
import { RegistroService } from '../../service/registro.service';
@Component({
    selector: 'app-inside-room',
    standalone: true,
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule, ChartModule, FormsModule, InputTextModule, TabsModule, KnobModule, CheckboxModule, Button],

    template: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- columna de la izquierda -->
            <div class="col-span-1">
                <div class="card ">
                    <p-chart type="line" [data]="lineData" [options]="lineOptions"></p-chart>
                    <div class="font-semibold text-xl mt-12 mb-4 flex justify-between items-center">
                        Ultimes dades registrades
                        <div class="flex gap-4">
                            <p-button (click)="openCares(room[0]?.paciente?.pac_id)">Afegir curas</p-button>
                            <p-button (click)="openDiet()">Afegir dieta</p-button>
                        </div>
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
                                    <p-knob [(ngModel)]="constantes.pulso" [readonly]="true" [step]="10" [min]="30" [max]="220" valueTemplate="{value}" />
                                </div>
                                <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                    <div class="font-semibold text-xl text-center">Temperatura</div>
                                    <p-knob [(ngModel)]="constantes.temperatura" [readonly]="true" [step]="10" [min]="30" [max]="42" valueTemplate="{value}°C" />
                                </div>
                                <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                    <div class="font-semibold text-xl text-center">Saturació d'oxigen</div>
                                    <p-knob [(ngModel)]="constantes.saturacion_oxigeno" [readonly]="true" [step]="10" [min]="80" [max]="100" valueTemplate="{value}%" />
                                </div>
                                <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                    <div class="font-semibold text-xl text-center">Frequencia respiratoria</div>
                                    <p-knob [(ngModel)]="constantes.frequencia_respiratoria" [readonly]="true" [step]="10" [min]="5" [max]="80" valueTemplate="{value}" />
                                </div>
                                <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                    <div class="font-semibold text-xl text-center">TA sistólica</div>
                                    <p-knob [(ngModel)]="constantes.ta_sistolica" [readonly]="true" [step]="10" [min]="60" [max]="180" valueTemplate="{value}" />
                                </div>
                                <div class="flex flex-col justify-center items-center gap-2 w-1/4">
                                    <div class="font-semibold text-xl text-center">TA diastólica</div>
                                    <p-knob [(ngModel)]="constantes.ta_diastolica" [readonly]="true" [step]="10" [min]="40" [max]="120" valueTemplate="{value}" />
                                </div>
                            </p-tabpanel>
                            <p-tabpanel value="1">
                                <div class="card flex flex-col gap-4">
                                    <div class="flex flex-col gap-2">
                                        <label for="dre_debito">Débito del Drenaje</label>
                                        <input [(ngModel)]="drenajes.dre_debito"  type="text" pInputText [disabled]="true" class="w-full h-max" />
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
                                            <p-checkbox  [(ngModel)]="this.movilizaciones.mov_ajuda_deambulacion" [binary]="true" [disabled]="true" inputId="mov_ajuda_deambulacion" />
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
            </div>

            <!-- Columna de la derecha -->
            <div class="col-span-1">
                <div class="card flex flex-col gap-5">
                    <div class="font-semibold text-3xl">
                        <h2 class=" mb-0">{{ paciente.pac_nombre + ' ' + paciente.pac_apellidos }}</h2>
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
                <!-- </div>
                <div class="card"> -->
                    <hr>
                    <div class="font-semibold text-xl mb-4">Informació del pacient</div>
                    <label for="pac_motiu_ingrees" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-4">Motiu d'ingrés:</label>
                    <div class="col-span-12 md:col-span-9 md:mb-4">
                        <input [(ngModel)]="this.diagnotico.dia_motivo" pInputText [disabled]="true" id="pac_alergias" type="text" class="w-full min-h-20" />
                    </div>
                    <label for="pac_diagnostic" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-4">Diagnostic:</label>
                    <div class="col-span-12 md:col-span-9">
                        <input [(ngModel)]="this.diagnotico.dia_diagnostico" pInputText [disabled]="true" id="pac_alergias" type="text" class="w-full min-h-20" />
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
            </div>
        </div>
    `
})
export class insideRooms implements OnInit {
    /* Room data */
    room_id: string | null = null;
    room: any[] = [];
    /* Patient data */

    /* Basicamente es un objeto para usarlo mejor en el front  */
    paciente: {
        pac_alergias: string | null;
        pac_antecedentes: string | null;
        pac_apellidos: string | null;
        pac_direccion_completa: string | null;
        pac_edad: number | null;
        pac_fecha_ingreso: string | null;
        pac_fecha_nacimiento: string | null;
        pac_id: number | null;
        pac_lengua_materna: string | null;
        pac_nombre: string | null;
        pac_nombre_cuidador: string | null;
        pac_num_historial: number | null;
        pac_telefono_cuidador: string | null;
    } = {
        pac_alergias: null,
        pac_antecedentes: null,
        pac_apellidos: null,
        pac_direccion_completa: null,
        pac_edad: null,
        pac_fecha_ingreso: null,
        pac_fecha_nacimiento: null,
        pac_id: null,
        pac_lengua_materna: null,
        pac_nombre: null,
        pac_nombre_cuidador: null,
        pac_num_historial: null,
        pac_telefono_cuidador: null
    };
    constantes: {
        ta_sistolica: number | null;
        ta_diastolica: number | null;
        frequencia_respiratoria: number | null;
        pulso: number | null;
        temperatura: number | null;
        saturacion_oxigeno: number | null;
        talla: number | null;
        diuresis: number | null;
        deposiciones: string | null;
        stp: string | null;
    } = {
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
    movilizaciones: {
        mov_ajuda_deambulacion: boolean | null;
        mov_ajuda_descripcion: string | null;
        mov_cambios: string | null;
        mov_decubitos: string | null;
        mov_sedestacion: boolean | null;
    } = {
        mov_ajuda_deambulacion: null,
        mov_ajuda_descripcion: null,
        mov_cambios: null,
        mov_decubitos: null,
        mov_sedestacion: null
    };

    drenajes: {
        dre_debito: string | null;
        tdre_desc: string | null;
    } = {
        dre_debito: null,
        tdre_desc: null
    };
    diagnotico: {
        dia_diagnostico: string | null;
        dia_motivo: string | null;
    } = {
        dia_diagnostico: null,
        dia_motivo: null
    };
    /* Char data */
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
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            this.initCharts();
        });
    }

    ngOnInit(): void {
        this.room_id = this.route.snapshot.paramMap.get('id');
        if (this.room_id) {
            this.rs.getRoom(this.room_id).subscribe((data: any) => {
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

                this.regs.getLastRegistro(this.room[0].paciente.pac_id).subscribe((data: any) => {
                    console.log(data);
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
                    this.movilizaciones = {
                        mov_ajuda_deambulacion: data.lastRegistro.mov.mov_ajuda_deambulacion ? data.lastRegistro.mov.mov_ajuda_deambulacion : false,
                        mov_ajuda_descripcion: data.lastRegistro.mov.mov_ajuda_descripcion ?? null,
                        mov_cambios: data.lastRegistro.mov.mov_cambios ?? null,
                        mov_decubitos: data.lastRegistro.mov.mov_decubitos ?? null,
                        mov_sedestacion: data.lastRegistro.mov.mov_sedestacion ? data.lastRegistro.mov.mov_sedestacion : false
                    }
                    this.drenajes = {
                        dre_debito: data.lastRegistro.dre.dre_debito ?? null,
                        tdre_desc: data.lastRegistro.dre.tdre_desc ?? null
                    };
                    this.diagnotico = {
                        dia_diagnostico: data.lastRegistro.dia.dia_diagnostico ?? null,
                        dia_motivo: data.lastRegistro.dia.dia_motivo ?? null
                    };
                });

                

            });
        }
        this.initCharts();
    }

    openCares(pac_id: string) {
        this.router.navigate(['habitacions/' + this.room_id + '/curas/', pac_id]);
    }
    openDiet() {
        this.router.navigate(['habitacions/' + this.room_id + '/dietes/', this.room_id]);
    }

    initCharts() {
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
                    backgroundColor: '#FF6384', // Red
                    borderColor: '#FF6384',
                    tension: 0.4
                },
                {
                    label: 'Temperatura (°C)',
                    data: [36.5, 36.6, 36.5, 36.6, 36.7, 36.6, 36.7, 36.8, 36.7, 37.2, 37.3, 37.2, 36.6, 36.5, 36.6, 36.5, 36.4, 36.5, 36.4, 36.5, 36.6],
                    fill: false,
                    backgroundColor: '#FFCE56', // Yellow
                    borderColor: '#FFCE56',
                    tension: 0.4
                },
                {
                    label: "Saturació d'oxigen (%)",
                    data: [98, 97, 98, 97, 96, 97, 96, 95, 96, 92, 91, 92, 96, 97, 96, 97, 98, 97, 98, 97, 96],
                    fill: false,
                    backgroundColor: '#36A2EB', // Blue
                    borderColor: '#36A2EB',
                    tension: 0.4
                },
                {
                    label: 'Frequencia respiratoria',
                    data: [16, 17, 16, 17, 18, 17, 18, 19, 18, 20, 21, 20, 18, 17, 18, 17, 16, 17, 16, 17, 18],
                    fill: false,
                    backgroundColor: '#4BC0C0', // Teal
                    borderColor: '#4BC0C0',
                    tension: 0.4
                },
                {
                    label: 'TA sistólica',
                    data: [120, 121, 120, 122, 123, 122, 118, 119, 118, 140, 141, 140, 119, 120, 119, 120, 121, 120, 121, 122, 121],
                    fill: false,
                    backgroundColor: '#9966FF', // Purple
                    borderColor: '#9966FF',
                    tension: 0.4
                },
                {
                    label: 'TA diastólica',
                    data: [80, 81, 80, 82, 83, 82, 78, 79, 78, 95, 96, 95, 79, 80, 79, 80, 81, 80, 81, 82, 81],
                    fill: false,
                    backgroundColor: '#FF9F40', // Orange
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
    }
}
