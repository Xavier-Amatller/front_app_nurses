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
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule, Fluid, ChartModule],
    template: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- columna de la izquierda
              -->
            <div class="col-span-1">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Linear</div>
                    <p-chart type="line" [data]="lineData" [options]="lineOptions"></p-chart>
                </div>
                <div class="card">

                </div>
            </div>

            <!-- Columna de la derecha  -->
            <div class="col-span-1">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Room Information</div>
                    <div *ngIf="room.length > 0">
                        <p><strong>Room ID:</strong> {{ room_id }}</p>
                        <p><strong>Patient Name:</strong> {{ room[0]?.paciente?.name || 'N/A' }}</p>
                        <p><strong>Other Info:</strong> {{ room[0]?.otherInfo || 'N/A' }}</p>
                    </div>
                    <div *ngIf="room.length === 0">
                        <p>No room information available.</p>
                    </div>
                    <button class="p-3 border rounded-xl bg-blue-700 text-white mt-4" (click)="openCares(room[0]?.paciente?.pac_id)">Cares</button>
                </div>
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
