import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '../../service/auth.service';
import { LayoutService } from '../service/layout.service';
import { AppConfigurator } from './app.configurator';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, Menu],
    template: `
        <div class="layout-topbar-blur">
            <div class="layout-topbar">
                <div class="layout-topbar-logo-container">
                    <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                        <i class="pi pi-bars"></i>
                    </button>
                    <a class="layout-topbar-logo" routerLink="/">
                        <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M300 500C189.543 500 100 410.457 100 300V300H300V500V500Z" fill="#8847C4" />
                            <path d="M0 300C0 189.543 89.5431 100 200 100V100V300H0V300Z" fill="#FF3D31" />
                            <path d="M500 200C500 310.457 410.457 400 300 400V400V200H500V200Z" fill="#FC8881" />
                            <path d="M400 200C400 89.5431 310.457 0 200 0V0V200H400V200Z" fill="#2A61ED" />
                            <rect x="200" y="100" width="100" height="300" fill="white" />
                            <rect x="400" y="200" width="100" height="300" transform="rotate(90 400 200)" fill="white" />
                        </svg>
                        <span>Stucom</span>
                    </a>
                </div>

                <div class="layout-topbar-actions layout-topbar-actions-bg">
                    <div class="layout-config-menu">
                        <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                            <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                        </button>
                        <div class="relative">
                            <button
                                class="layout-topbar-action layout-topbar-action-highlight"
                                pStyleClass="@next"
                                enterFromClass="hidden"
                                enterActiveClass="animate-scalein"
                                leaveToClass="hidden"
                                leaveActiveClass="animate-fadeout"
                                [hideOnOutsideClick]="true"
                            >
                                <i class="pi pi-palette"></i>
                            </button>
                            <app-configurator />
                        </div>
                    </div>

                    <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                        <i class="pi pi-ellipsis-v"></i>
                    </button>
                    
                    <div class="layout-topbar-menu hidden lg:block">
                        <div class="layout-topbar-menu-content">
                            <!-- <button type="button" class="layout-topbar-action">
                                <i class="pi pi-calendar"></i>
                                <span>Calendar</span>
                            </button>
                            <button type="button" class="layout-topbar-action">
                                <i class="pi pi-inbox"></i>
                                <span>Messages</span>
                            </button> -->
                            <button type="button" class="layout-topbar-action">
                                <i class="pi pi-user"></i>
                                <span>Profile</span>
                            </button>
                            <button type="button" class="layout-topbar-action transition-all hover:bg-red-400" (click)="logOut()">
                                <i class="pi pi-sign-out"></i>
                                <span>Sortir</span>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppTopbar {
    constructor(
        public layoutService: LayoutService,
        private readonly AuthService: AuthService
    ) {}

    displayConfirmation: boolean = false;

    items!: MenuItem[];

    overlayMenuItems = [
        {
            label: 'Tanca sessió',
            icon: 'pi pi-sign-out',
            command: () => this.AuthService.logout()
        }
    ];

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
    logOut(){
        this.AuthService.logout();
    }
}
