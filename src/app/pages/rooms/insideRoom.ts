import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { RoomsService } from '../../service/rooms.service';

@Component({
    selector: 'app-inside-room',
    standalone: true,
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule],
    template: `
        <div>
            <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 justify-items-center pb-10">
                <h1>Numero de room: {{ room_id }}</h1>
            </div>
            <div>
                <!-- Implementar boton que te redirija a cares, mandando el id de el usuario a hacer la care. Tomar como ejemplo el realizado para acceder a dentro de la rooms, pasando el id de room -->
                <button class="p-3 border rounded-xl bg-blue-700 text-white w-1/4" (click)="openCares(room[0].paciente.pac_id)">Cares</button>
            </div>
        </div>
    `
})
export class insideRooms implements OnInit {

    room_id: string | null = null;
    room: any[] = [];

    constructor(
        private rs: RoomsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.room_id = this.route.snapshot.paramMap.get('id');
        if (this.room_id) {
            this.rs.getRoom(this.room_id).subscribe((data: any) => {
                this.room = data;
            });
        }
    }

    openCares(pac_id: string) {
        this.router.navigate(['/cares/', pac_id]);
    }

}
