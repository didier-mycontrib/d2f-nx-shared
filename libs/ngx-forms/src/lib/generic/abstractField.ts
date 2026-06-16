import { Component, computed, input, model, signal, Signal } from "@angular/core";
import { computed_fieldErrorMessageSignal, isFieldValid } from "../common/util/mySignalFormUtil";
import { FieldLayout } from "../common/data/fieldInfo";
import { NgClass } from "@angular/common";

@Component({
  selector: 'ngx-abstract-field',
  imports: [],
  template : ``
})
export class AbstractFieldComponent {
     name = input("fieldName"); //mandatory fieldName
     label=input<string|undefined>(undefined); //optional specific label
     fieldLayout = input<FieldLayout>('col'); //always in same col by defaut
     effectiveLabel = computed(()=>this.label()?this.label():this.name());

     formRef = input<any>(undefined); //undefined in template-driven mode
                                 //non null with signalForm

    fieldData = model<any>(); //non null in template-driven mode
                                 //undefined with signalForm (already formRef()[name]  as fieldData

    inputClass(){
     return {
        'ml-1':true,
        'w-28/40' : this.fieldLayout() == 'row',
        'w-96/100' : this.fieldLayout() == 'col',
       };
    }

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

/*
Attention: = input(..) and =model(...) are only accepted 
as field initializer
in a class decorated by @Component or @Directive
*/