import { Routes } from '@angular/router';
import { insideRooms } from './insideRoom';
import { Rooms } from './rooms';

export default [
    { path: '', component: Rooms },
    { path: ':id?', component: insideRooms },
    /* { path: 'tools', component: UrlWidget }, */
    { path: '**', redirectTo: '/notfound' }
] as Routes;
