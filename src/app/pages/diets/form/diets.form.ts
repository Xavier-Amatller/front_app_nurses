import { animate, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Skeleton } from 'primeng/skeleton';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../service/auth.service';
import { DietsService } from '../../../service/diets.service';

interface SelectOption {
    name: string;
    code: string;
}

@Component({
    selector: 'app-diets-form',
    standalone: true,
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule, CheckboxModule, MultiSelectModule, ToastModule, MessageModule, NgIf, NgFor, Skeleton],
    providers: [MessageService],
    animations: [trigger('fadeAnimation', [transition(':enter', [style({ opacity: 0 }), animate('600ms ease-in', style({ opacity: 1 }))]), transition(':leave', [animate('400ms ease-out', style({ opacity: 0 }))])])],

    template: `
        <p-fluid>
            <p-toast position="top-right"></p-toast>
            <div class="card flex flex-col items-center gap-4">
                <div class="font-semibold text-xl">Introdueix un num d'habitació</div>
                <div class="flex flex-wrap items-center gap-6">
                    <div class="field">
                        <label for="numRoom" class="sr-only"></label>
                        <input [(ngModel)]="id" pInputText id="numRoom" type="text" placeholder="Num habitació" [class.ng-invalid]="!id && submitted" [class.ng-dirty]="submitted" />
                        <p-message *ngIf="!id && submitted" severity="error" text="El número d'habitació és obligatori"></p-message>
                    </div>
                    <p-button (onClick)="searchDiet()" [loading]="loading" [disabled]="!id" label="Trobar dieta" [fluid]="false"></p-button>
                    <p-button (onClick)="newDiet()" [loading]="loading" [disabled]="!pac_id" label="Aplicar nova dieta" [fluid]="false"></p-button>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-1/2">
                    <div class="card flex flex-col gap-4 h-[350px]">
                        <div class="font-semibold text-xl">Nova dieta</div>

                        <div class="flex flex-col gap-2">
                            <label for="textures">Textures</label>
                            <p-select
                                id="textures"
                                [(ngModel)]="selectedTexture"
                                [options]="dietTextures"
                                [loading]="loading"
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Selecciona una textura"
                                class="w-full"
                                [class.ng-invalid]="!selectedTexture && submitted"
                                [class.ng-dirty]="submitted"
                            ></p-select>
                            <p-message *ngIf="!selectedTexture && submitted" severity="error" text="La textura és obligatòria"></p-message>
                        </div>

                        <div class="flex flex-col gap-2 ">
                            <label for="dietType">Tipus de dieta</label>
                            <p-multiSelect
                                id="dietType"
                                [(ngModel)]="selectedDietType"
                                [options]="dietTypes"
                                [loading]="loading"
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Selecciona preferències"
                                class="w-full"
                                [showToggleAll]="false"
                                [filter]="true"
                                [class.ng-invalid]="selectedDietType.length === 0 && submitted"
                                [class.ng-dirty]="submitted"
                            ></p-multiSelect>
                            <p-message *ngIf="selectedDietType?.length === 0 && submitted" severity="error" text="El tipus de dieta és obligatori"></p-message>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="autonomy">Autònom o ajuda</label>
                            <p-select
                                id="autonomy"
                                [(ngModel)]="selectedAutonomy"
                                [options]="autonomyOptions"
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Selecciona una opció"
                                class="w-full"
                                [class.ng-invalid]="!selectedAutonomy && submitted"
                                [class.ng-dirty]="submitted"
                            ></p-select>
                            <p-message *ngIf="!selectedAutonomy && submitted" severity="error" text="L'autonomia és obligatòria"></p-message>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <label for="prosthesis">Portador de pròtesi</label>
                            <p-checkbox id="prosthesis" [(ngModel)]="hasProsthesis" [binary]="true"></p-checkbox>
                        </div>
                    </div>
                </div>
                <div class="md:w-1/2">
                    <div class="card flex flex-col gap-8 h-[350px]">
                        <div class="font-semibold text-xl">Dieta actual</div>
                        <div class="grid grid-cols-12 gap-4">
                            <label for="lastDietText" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Textures:</label>
                            <div class="col-span-12 md:col-span-10">
                                <input pInputText [disabled]="true" id="lastDietText" type="text" [(ngModel)]="lastDietText" />
                            </div>
                        </div>
                        <div class="grid grid-cols-12 gap-4">
                            <label for="lastDietType" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Tipus de dieta:</label>
                            <div class="col-span-12 md:col-span-10">
                                <input pInputText [disabled]="true" id="lastDietType" type="text" [(ngModel)]="lastDietType" />
                            </div>
                        </div>
                        <div class="grid grid-cols-12 gap-4 grid-cols-12 gap-2">
                            <label for="lastDietHelp" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Autònom o ajuda:</label>
                            <div class="col-span-12 md:col-span-10">
                                <input pInputText [disabled]="true" id="lastDietHelp" type="text" [(ngModel)]="lastDietHelp" />
                            </div>
                        </div>
                        <div class="grid grid-cols-12 gap-4 grid-cols-12 gap-2">
                            <label for="lastDietProte" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Portador de pròtesi:</label>
                            <div class="col-span-12 md:col-span-10">
                                <input pInputText [disabled]="true" id="lastDietProte" type="text" [(ngModel)]="lastDietProte" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ng-container *ngIf="loading; else historyDietBlock">
                <div @fadeAnimation class="card flex gap-4 mt-8 overflow-x-auto h-auto">
                    <p-skeleton class="w-[300px] transition-all" height="180px"></p-skeleton>
                    <p-skeleton class="w-[300px] transition-all" height="180px"></p-skeleton>
                    <p-skeleton class="w-[300px] transition-all" height="180px"></p-skeleton>
                    <p-skeleton class="w-[300px] transition-all" height="180px"></p-skeleton>
                </div>
            </ng-container>
            <ng-template #historyDietBlock>
                <div  @fadeAnimation *ngIf="historyDiet.length > 0" class="card flex gap-4 mt-8 overflow-x-auto h-auto">
                    <div *ngFor="let item of historyDiet" class=" !p-0">
                        <div class="card border w-[300px]">
                            <h4 class="mb-0">Dia {{ item.reg_fecha }}</h4>
                            <p class="mb-6 text-gray-600 text-lg">{{ item.reg_hora }}</p>
                            <p>Textura: {{ item.Die_TText?.descripcion ?? '-' }}</p>
                            <p>Tipus de dieta: {{ item.tipos_dietas }}</p>
                            <p>Autònom o ajuda: {{ item.Die_Autonomo === true ? 'Autònom' : 'Ajuda' }}</p>
                            <p>Portador de pròtesi: {{ item.Die_Protesi === true ? 'Sí' : 'No' }}</p>
                        </div>
                    </div>
                </div>
            </ng-template>
        </p-fluid>
    `
})
export class DietsFormComponent implements OnInit {
    constructor(
        private readonly dietsService: DietsService,
        private readonly AuthService: AuthService,
        private readonly route: ActivatedRoute,
        private readonly messageService: MessageService
    ) {}

    selectedTexture: string | null = null;
    historyDiet: any[] = [];
    selectedDietType: string[] = [];
    selectedAutonomy: string | null = null;
    hasProsthesis: boolean | undefined = undefined;
    lastDietText: string = '';
    lastDietType: string = '';
    lastDietHelp: string = '';
    lastDietProte: string = '';
    id: string = '';
    pac_id: string = '';
    loading = true;
    response: any = null;
    submitted = false;
    dietHistoryLoading = false;
    dietTextures: SelectOption[] = [{ name: '', code: '' }];
    dietTypes: SelectOption[] = [];
    autonomyOptions: SelectOption[] = [
        { name: 'Autònom', code: 'AUTO' },
        { name: 'Ajuda', code: 'HELP' }
    ];

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params['id'] ?? '';
        });
        this.dietsService.getOptions().subscribe({
            next: (response) => {
                this.response = response;
                this.response.data.tipos_dieta.forEach((item: any) => {
                    this.dietTypes.push({
                        name: item.descripcion,
                        code: item.id.toString()
                    });
                });

                this.response.data.tipos_textura.forEach((item: any) => {
                    this.dietTextures.push({
                        name: item.descripcion,
                        code: item.id.toString()
                    });
                });
            },
            complete: () => {
                this.dietTextures.shift();
                this.loading = false;
            }
        });

        if (this.id) {
            this.searchDiet();
        }
    }

    searchDiet() {
        if (!this.id) {
            return;
        }

        this.loading = true;
        // Reset the last diet values
        this.lastDietText = '';
        this.lastDietType = '';
        this.lastDietHelp = '';
        this.lastDietProte = '';

        this.dietsService.getDiet(this.id).subscribe({
            next: (response) => {
                this.response = response;
                this.pac_id = this.response.data.pac_id;
                if (this.response.message === 'noDiet') {
                    this.historyDiet = [];
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertència',
                        detail: 'Aquest pacient no té dieta assignada'
                    });
                } else {
                    // Actualiza los campos con los datos reales del backend
                    this.lastDietText = this.response.data.Die_TText?.descripcion ?? '';
                    this.lastDietType = (this.response.data.Tipos_Dietas ?? []).map((TDieta: any) => TDieta.descripcion).join(', ');
                    this.lastDietHelp = this.response.data.Die_Autonomo === true ? 'Autònom' : 'Ajuda';
                    this.lastDietProte = this.response.data.Die_Protesi === true ? 'Sí' : 'No';

                    this.dietsService.getDietsHistory(this.pac_id).subscribe({
                        next: (response: any) => {
                            this.historyDiet = response.data.history.map((item: any) => {
                                let fecha = '';
                                let hora = '';
                                if (item.reg_timestamp) {
                                    const [f, h] = item.reg_timestamp.split(' ');
                                    fecha = f;
                                    hora = h;
                                }
                                // Procesar Tipos_Dietas para mostrar descripciones unidas por coma o '-'
                                const tiposDietas = item.Tipos_Dietas && Array.isArray(item.Tipos_Dietas) ? item.Tipos_Dietas.map((d: any) => d.descripcion).join(', ') : '-';
                                return {
                                    ...item,
                                    reg_fecha: fecha,
                                    reg_hora: hora,
                                    tiposDietas
                                };
                            });
                        },
                        error: (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Error al carregar la història de la dieta'
                            });
                        }
                    });
                }
            },
            error: (error) => {
                if (error.error.message === 'noPatient') {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Advertència',
                        detail: 'Aquesta habitació no té pacient assignat'
                    });
                }
                if (error.error.message === 'roomNotFound') {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Aquesta habitació no existeix'
                    });
                }

                this.lastDietText = '';
                this.lastDietType = '';
                this.lastDietHelp = '';
                this.lastDietProte = '';
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    newDiet() {
        this.submitted = true;
        if (this.hasProsthesis === undefined) {
            this.hasProsthesis = false; // Set default value if undefined
        }
        if (this.pac_id && this.selectedTexture && this.selectedDietType.length > 0 && this.selectedAutonomy && this.hasProsthesis !== undefined) {
            this.loading = true;
            const sanitizedTexture = this.selectedTexture?.trim();
            const sanitizedDietType = this.selectedDietType.map((type) => type.trim());
            const sanitizedAutonomy = this.selectedAutonomy == 'AUTO';
            const sanitizedProsthesis = this.hasProsthesis;

            const aux_id = Number(this.AuthService.getAuxiliarId());
            if (!aux_id) {
                this.loading = false;
                return;
            }
            this.dietsService.insertDiet(this.pac_id, sanitizedTexture, sanitizedDietType, sanitizedAutonomy, sanitizedProsthesis, aux_id).subscribe({
                next: (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Dieta assignada',
                        detail: 'Dieta assignada correctament'
                    });
                },
                error: (error) => {
                    this.loading = false;
                },
                complete: () => {
                    this.searchDiet();
                    this.loading = false;
                }
            });
        }
    }
}
