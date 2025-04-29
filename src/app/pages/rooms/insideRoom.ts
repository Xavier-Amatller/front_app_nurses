import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-inside-room',
    standalone: true,
    imports: [PaginatorModule, CommonModule, SkeletonModule, CardModule],
    template: `
        <div>
            <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 justify-items-center pb-10">
                <h1>Numero de room: {{ room_id }}</h1>
            </div>
        </div>
    `
})
export class insideRooms implements OnInit {

    room_id: string | null = null;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.room_id = this.route.snapshot.paramMap.get('id');
    }

}
