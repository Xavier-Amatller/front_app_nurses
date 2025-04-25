import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
                <h1>Numero de room:</h1>
            </div>
        </div>
    `
})
export class insideRooms {

}
