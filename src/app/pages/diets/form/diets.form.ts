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
                                <label for="firstname1" class="sr-only">Firstname</label>
                                <input pInputText id="firstname1" type="text" placeholder="Firstname" />
                            </div>
                            <p-button label="Trobar dieta" [fluid]="false"></p-button>
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
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Horizontal</div>
                    <div class="grid grid-cols-12 gap-4 grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Name</label>
                        <div class="col-span-12 md:col-span-10">
                            <input pInputText id="name3" type="text" />
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-4 grid-cols-12 gap-2">
                        <label for="email3" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Email</label>
                        <div class="col-span-12 md:col-span-10">
                            <input pInputText id="email3" type="text" />
                        </div>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Inline</div>
                    <div class="flex flex-wrap items-start gap-6">
                        <div class="field">
                            <label for="firstname1" class="sr-only">Firstname</label>
                            <input pInputText id="firstname1" type="text" placeholder="Firstname" />
                        </div>
                        <div class="field">
                            <label for="lastname1" class="sr-only">Lastname</label>
                            <input pInputText id="lastname1" type="text" placeholder="Lastname" />
                        </div>
                        <p-button label="Submit" [fluid]="false"></p-button>
                    </div>
                </div>
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Help Text</div>
                    <div class="flex flex-wrap gap-2">
                        <label for="username">Username</label>
                        <input pInputText id="username" type="text" />
                        <small>Enter your username to reset your password.</small>
                    </div>
                </div>
            </div>
            </div>
        </p-fluid>
    `
})
export class DietsFormComponent implements OnInit {
    constructor(private readonly dietsService: DietsService) {}

    selectedTexture: string | null = null;
    selectedDietType: string | null = null;
    selectedAutonomy: string | null = null;
    hasProsthesis: boolean = false;
    selectedPreferences: string[] = [];

    id: number = 1; 

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
                this.dietTextures.shift(); // Remove the first element because it's needed to show the selected option properly
                this.loading = false;
            }
        });
        this.dietsService.getDiet(this.id).subscribe({
            next: (response) => {
                this.response = response;
                this.selectedTexture = this.response.data.id_textura
                this.selectedDietType = this.response.data.id_tipo_dieta
                this.selectedAutonomy = this.response.data.autonomia.toString();
                this.hasProsthesis = this.response.data.portador_protesi == 1;
                this.selectedPreferences = this.response.data.preferencies.map((item: any) => item.id.toString());
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    dietTextures: SelectOption[] = [{ name: '', code: '' }];

    dietTypes: SelectOption[] = [];

    autonomyOptions: SelectOption[] = [
        // Changed to use SelectOption interface
        { name: 'Autònom', code: 'AUTO' },
        { name: 'Ajuda', code: 'HELP' }
    ];
}
