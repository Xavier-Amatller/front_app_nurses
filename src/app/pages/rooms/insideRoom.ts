import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { RoomsService } from '../../service/rooms.service';
import { Fluid } from 'primeng/fluid';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../../layout/service/layout.service';
@Component({
    selector: 'app-inside-room',
    standalone: true,
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule,Fluid,ChartModule],
    template: `
        <p-fluid class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-6">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Linear</div>
                    <p-chart type="line" [data]="lineData" [options]="lineOptions"></p-chart>
                </div>
            </div>
        </p-fluid>
        <div>
            <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 justify-items-center pb-10"></div>
            <div>
                <!-- Implementar boton que te redirija a cares, mandando el id de el usuario a hacer la care. Tomar como ejemplo el realizado para acceder a dentro de la rooms, pasando el id de room -->
                <button class="p-3 border rounded-xl bg-blue-700 text-white w-1/6" (click)="openCares(room[0].paciente.pac_id)">Cares</button>
            </div>
        </div>
    `
})
export class insideRooms implements OnInit {
    room_id: string | null = null;
    room: any[] = [];

    lineData: any;
    lineOptions: any;

    
        subscription: Subscription;
    constructor(
        private rs: RoomsService,
        private route: ActivatedRoute,
        private router: Router,
        private layoutService: LayoutService
    ) { this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
        this.initCharts();
    });}


    ngOnInit(): void {
        this.room_id = this.route.snapshot.paramMap.get('id');
        if (this.room_id) {
            this.rs.getRoom(this.room_id).subscribe((data: any) => {
                this.room = data;
                console.log(this.room);
            });
        }
        this.initCharts();
    }

    openCares(pac_id: string) {
        this.router.navigate(['/cares/', pac_id]);
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-200'),
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
