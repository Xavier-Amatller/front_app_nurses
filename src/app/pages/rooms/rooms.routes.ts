import { Routes } from '@angular/router';


export default [
    { path: ':id', /* component: */},
    { path: ':id/addcures', /* component: */},
    { path: '**', redirectTo: '/notfound' }
] as Routes;