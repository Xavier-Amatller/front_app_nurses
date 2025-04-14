import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DietsService } from '../../service/diets.service';
interface SelectOption {
    name: string;
    code: string;
}

@Component({
    selector: 'app-diets-form',
    standalone: true,

    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule, CheckboxModule, MultiSelectModule],
    template: `
        <p-fluid>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-1/2">
                    <div class="card flex flex-col gap-4">
                        <div class="font-semibold text-xl">Introdueix un num d'habitació</div>
                        <div class="flex flex-wrap items-start gap-6">
                            <div class="field">
                                <label for="numRoom" class="sr-only"></label>
                                <input [(ngModel)]="id" pInputText id="numRoom" type="text" placeholder="Num habitació" />
                            </div>
                            <p-button (onClick)="searchDiet()" label="Trobar dieta" [fluid]="false"></p-button>
                            <p-button label="Aplicar nova dieta" [fluid]="false"></p-button>
                        </div>
                    </div>
                    <div class="card flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <label for="textures">Textures</label>
                            <p-select id="textures" [(ngModel)]="selectedTexture" [options]="dietTextures" [loading]="loading" optionLabel="name" optionValue="code" placeholder="Selecciona una textura" class="w-full"> </p-select>
                        </div>

                        <!-- Tipus de dieta -->
                        <div class="flex flex-col gap-2">
                            <label for="dietType">Tipus de dieta</label>
                            <p-multiSelect
                                id="dietType"
                                [(ngModel)]="selectedPreferences"
                                [options]="dietTypes"
                                [loading]="loading"
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Selecciona preferències"
                                class="w-full"
                                [showToggleAll]="false"
                                [filter]="true"
                            ></p-multiSelect>
                        </div>

                        <!-- Autònom o ajuda -->
                        <div class="flex flex-col gap-2">
                            <label for="autonomy">Autònom o ajuda</label>
                            <p-select id="autonomy" [(ngModel)]="selectedAutonomy" [options]="autonomyOptions" optionLabel="name" optionValue="code" placeholder="Selecciona una opció" class="w-full" />
                        </div>

                        <!-- Portador de pròtesi -->
                        <div class="flex flex-wrap gap-2">
                            <label for="prosthesis">Portador de pròtesi</label>
                            <p-checkbox id="prosthesis" [(ngModel)]="hasProsthesis" [binary]="true"></p-checkbox>
                        </div>
                    </div>
                </div>
                <div class="md:w-1/2">
                    <div class="card flex flex-col gap-10">
                        <div class="font-semibold text-xl">Dieta actual</div>
                        <div class="grid grid-cols-12 gap-4">
                            <label for="lastDietText" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Textures:</label>
                            <div class="col-span-12 md:col-span-10">
                                <input pInputText [disabled]="true" id="lastDietText" type="text" [(ngModel)]="lastDietText" />
                            </div>
                        </div>
                        <div class="grid grid-cols-12 gap-4 grid-cols-12 gap-2">
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
    constructor(private readonly dietsService: DietsService) {}

    firstname: string = '';
    selectedTexture: string | null = null;
    selectedDietType: string | null = null;
    selectedAutonomy: string | null = null;
    hasProsthesis: boolean = false;
    selectedPreferences: string[] = [];

    lastDietText: string = '';
    lastDietType: string = '';
    lastDietHelp: string = '';
    lastDietProte: string = '';

    id: string = '';

    loading = true;

    response: any = null;

    ngOnInit(): void {
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
        this.dietsService.getDiet(this.id).subscribe({
            next: (response) => {
                this.response = response;
                this.lastDietText = this.response.data.Die_TText.descripcion;
                this.lastDietType = this.response.data.Tipos_Dietas.map((TDieta: any) => TDieta.descripcion);
                this.lastDietHelp = this.response.data.Die_Autonomo == 1 ? 'Sí' : 'No';
                this.lastDietProte = this.response.data.Die_Protesi == 1 ? 'Sí' : 'No';
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    dietTextures: SelectOption[] = [{ name: '', code: '' }];

    dietTypes: SelectOption[] = [];

    autonomyOptions: SelectOption[] = [
        { name: 'Autònom', code: 'AUTO' },
        { name: 'Ajuda', code: 'HELP' }
    ];
}
