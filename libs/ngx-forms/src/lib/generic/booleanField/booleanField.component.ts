import { Component } from '@angular/core';
import { AbstractFieldComponent } from '../abstractField';
import { FormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';

@Component({
  selector: 'd2fngx-boolean-field',
  imports: [FormsModule,FormField,NgClass],
  templateUrl: './booleanField.component.html',
  styleUrl: './booleanField.component.css',
})
export class D2fNgxBooleanFieldComponent extends AbstractFieldComponent {}
