import { Routes } from '@angular/router';
import { Cares } from '../cares/cares';
import { Diets } from '../diets/diets';
import { InsideRooms } from './insideRoom';
import { Rooms } from './rooms';
export default [
    { path: '', component: Rooms },
    { path: ':id', component: InsideRooms },
    { path: ':id/curas/:id', component: Cares },
    { path: ':id/dietes/:id', component: Diets },

    /* { path: 'tools', component: UrlWidget }, */
    { path: '**', redirectTo: '/notfound' }
] as Routes;
