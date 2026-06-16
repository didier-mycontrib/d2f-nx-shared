import { Component, input, signal, Signal } from '@angular/core';
import { AbstractFieldComponent } from '../abstractField';
import { FormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import { computed_fieldErrorMessageSignal, isFieldValid } from '../../common/util/mySignalFormUtil';

@Component({
  selector: 'ngx-label-input-field',
  imports: [FormsModule,FormField,NgClass],
  templateUrl: './labelInputField.component.html',
  styleUrls: ['./labelInputField.component.css' , '../../common/css/common.form.css'],
})
export class LabelInputFieldComponent extends AbstractFieldComponent{

  inputType=input("text");
  fieldErrorMessageSignal! :Signal<string> ;
     
  ngOnInit(){
       if(this.formRef()){
            //console.log(this.formRef()) //complex Proxy (not null, not undefined)
            //console.log(this.formRef()()) // ok,object with .controlValue, ...
            this.fieldErrorMessageSignal = computed_fieldErrorMessageSignal(this.formRef(),this.name());
       }else{
            this.fieldErrorMessageSignal = signal("");
       }
  }  

 isOver=signal(false);
 hasFocus=signal(false);

  onFocus(){
     this.hasFocus.set(true);
  }

   onBlur(){
     this.hasFocus.set(false);
  }

   onMouseEnter(){
     this.isOver.set(true);
  }

   onMouseLeave(){
     this.isOver.set(false);
  }

   override labelClass(){
     let labelClasses :any = super.labelClass();
     if(this.formRef()){
          let invalid= !isFieldValid(this.name(),this.formRef());
          if(invalid) 
               labelClasses['field-invalid']=invalid;
     }
     return labelClasses;
   }


}
