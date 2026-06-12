import { Component, computed, input, model, signal, Signal } from "@angular/core";
import { computed_fieldErrorMessageSignal, isFieldValid } from "../common/util/mySignalFormUtil";

@Component({
  selector: 'ngx-abstract-field',
  imports: [],
  template : ``
})
export class AbstractFieldComponent {
     name = input("fieldName"); //mandatory fieldName
     label=input<string|undefined>(undefined); //optional specific label
     effectiveLabel = computed(()=>this.label()?this.label():this.name());

     formRef = input<any>(undefined); //undefined in template-driven mode
                                 //non null with signalForm

    fieldData = model<any>(); //non null in template-driven mode
                                 //undefined with signalForm (already formRef()[name]  as fieldData)


}

/*
Attention: = input(..) and =model(...) are only accepted 
as field initializer
in a class decorated by @Component or @Directive
*/