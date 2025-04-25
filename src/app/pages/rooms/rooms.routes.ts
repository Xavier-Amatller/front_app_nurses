import { Routes } from '@angular/router';
import { Rooms } from './rooms';

export default [
    { path: '', component: Rooms },
    /* { path: 'tools', component: UrlWidget }, */
    { path: '**', redirectTo: '/notfound' }
] as Routes;
