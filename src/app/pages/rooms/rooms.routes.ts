import { Routes } from '@angular/router';
import { insideRooms } from './insideRoom';
import { Rooms } from './rooms';
import { Cares } from '../cares/cares';
import { Diets } from '../diets/diets';
export default [
    { path: '', component: Rooms },
    { path: ':id', component: insideRooms },
    { path: ':id/curas/:id', component: Cares },
    { path: ':id/dietes/:id', component: Diets },

    /* { path: 'tools', component: UrlWidget }, */
    { path: '**', redirectTo: '/notfound' }
] as Routes;
