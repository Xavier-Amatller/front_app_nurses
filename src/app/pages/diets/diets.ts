import { Component } from '@angular/core';
import { DietsFormComponent } from "./form/diets.form";

@Component({
    selector: 'app-diets',
    imports: [DietsFormComponent],
    template: `
        <app-diets-form></app-diets-form>
    `
})
export class Diets {}
