import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, CommonModule],
    providers: [AuthService],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Tcai Alumnes</div>
                            <span class="text-muted-color font-medium">Inicia sessió per continuar</span>
                        </div>

                        <div>
                            <label for="aux_number" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Nº Auxiliar</label>
                            <input pInputText id="aux_number" type="text" placeholder="Nº Auxiliar" class="w-full md:w-[30rem] mb-8" [(ngModel)]="aux_number" required />

                            <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Contrasenya</label>
                            <p-password id="password" [(ngModel)]="password" placeholder="Contrasenya" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false" required></p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <!-- <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Recorda'm</label>
                                </div> -->
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Has oblidat la teva contrasenya?</span>
                            </div>
                            <div *ngIf="isLoginError" class="text-red-500 text-center mb-4">Credencials incorrectes. Torna-ho a intentar.</div>
                            <p-button [loading]="loading" label="Inicia sessió" styleClass="w-full" (onClick)="login()"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login implements OnInit {
    aux_number: string = '';
    password: string = '';
    checked: boolean = false;
    isLoginError: boolean = false;
    loading: boolean = false;

    constructor(
        private readonly AuthService: AuthService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        if (this.AuthService.isAuthenticated()) {
            this.redirectBasedOnRole();
        }
    }

    login(): void {
        this.loading = true;
        this.isLoginError = false; // Resetear el error al intentar de nuevo
        this.AuthService.login(this.aux_number, this.password).subscribe({
            next: (response) => {
                if (response && response.token) {
                    this.AuthService.setAuthData(response); // Almacena token, userId y role
                    this.redirectBasedOnRole();
                } else {
                    this.isLoginError = true;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al iniciar sesión', error);
                this.isLoginError = true;
                this.loading = false;
            }
        });
    }

    private redirectBasedOnRole(): void {
        if (this.AuthService.isAdmin()) {
            this.router.navigate(['/backoffice']);
        } else {
            this.router.navigate(['/tauler']);
        }
    }
}