import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FieldLayout } from '../../common/data/fieldInfo';


@Component({
  selector: 'd2fngx-label-any-content-field',
  imports: [NgClass],
  templateUrl: './label-any-content-field.component.html',
  styleUrl: './label-any-content-field.component.css',
})
export class D2fNgxLabelAnyContentFieldComponent {
     name = input<string|undefined>(undefined); //mandatory fieldName
     label=input<string>(this.name()??"xyz"); //optional specific label
     fieldLayout = input<FieldLayout>('col'); //always in same col by defaut
    
     labelClass(){
     return {
        'block' : this.fieldLayout() == 'col',
        'md:inline-block' : this.fieldLayout() == 'row',
        'sm:block' : this.fieldLayout() == 'row',
        'text-sm' : this.fieldLayout() == 'col',
        'w-10/40' : this.fieldLayout() == 'row',
       };
    }
}
