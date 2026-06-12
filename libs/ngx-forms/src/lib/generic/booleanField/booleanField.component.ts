import { Component } from '@angular/core';
import { AbstractFieldComponent } from '../abstractField';
import { FormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'ngx-boolean-field',
  imports: [FormsModule,FormField],
  templateUrl: './booleanField.component.html',
  styleUrl: './booleanField.component.css',
})
export class BooleanFieldComponent extends AbstractFieldComponent {}
