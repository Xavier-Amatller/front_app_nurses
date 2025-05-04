import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { AuthService } from '../../../service/auth.service';
import { DietsService } from '../../../service/diets.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';

interface SelectOption {
    name: string;
    code: string;
}

@Component({
    selector: 'app-diets-form',
    standalone: true,
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule, CheckboxModule, MultiSelectModule, ToastModule, MessageModule, NgIf],
    providers: [MessageService],
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
                    <div class="card flex flex-col gap-4">
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

                        <div class="flex flex-col gap-2">
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
                    <div class="card flex flex-col gap-8">
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

        this.dietsService.getDiet(this.id).subscribe({
            next: (response) => {
                this.response = response;
                this.pac_id = this.response.data.pac_id;

                this.lastDietText = this.response.data.Die_TText?.descripcion ?? '';
                this.lastDietType = this.response.data.Tipos_Dietas.map((TDieta: any) => TDieta.descripcion);
                this.lastDietHelp = this.response.data.Die_Autonomo == 1 ? 'Autònom' : 'Ajuda';
                this.lastDietProte = this.response.data.Die_Protesi == 1 ? 'Sí' : 'No';
            },
            error: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Warn Message',
                    detail: 'Aquest pacient no té dieta assignada'
                });
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
            if (this.pac_id && this.selectedTexture && this.selectedDietType.length > 0 && this.selectedAutonomy && this.hasProsthesis !== undefined) {
                this.loading = true;
                const sanitizedTexture = this.selectedTexture?.trim();
                const sanitizedDietType = this.selectedDietType.map((type) => type.trim());
                const sanitizedAutonomy = this.selectedAutonomy == 'AUTO';
                const sanitizedProsthesis = this.hasProsthesis;

                const aux_id = Number(this.AuthService.getAuxiliarId());
                if (!aux_id) {
                    console.error('Invalid auxId in localStorage');
                    this.loading = false;
                    return;
                }

                this.dietsService.insertDiet(this.pac_id, sanitizedTexture, sanitizedDietType, sanitizedAutonomy, sanitizedProsthesis, aux_id).subscribe({
                    next: (response) => {
                        console.log(response);
                        this.messageService.add({
                            severity: 'Success',
                            summary: 'Success Message',
                            detail: 'Dieta assignada correctament'
                        });
                    },
                    error: (error) => {
                        console.log(error);
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
}
