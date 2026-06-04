import { NgClass } from '@angular/common';
import { Component, computed, input, Signal } from '@angular/core';
import { FormField , ValidationError  } from '@angular/forms/signals';

/*
En version signalForm
*/


@Component({
  selector: 'lib-dynamic-form',
  imports: [FormField,NgClass],
  templateUrl: './dynamicForm.component.html',
  styleUrl: './dynamicForm.component.css',
})
export class DynamicFormComponent {
  formRef = input<any>();
  entityModel!:object

  ngOnInit(){
   let entityModelSignal = (this.formRef())().controlValue;
   this.entityModel = entityModelSignal();
   console.log("entityModel=" + JSON.stringify(this.entityModel));
  }

   objectKeysArray(obj:object):any[]{
          return Reflect.ownKeys(obj);
        }

   errorSignal(fieldName:string ) : Signal<string> {
      let f = this.formRef()[fieldName];
      let errors = <ValidationError.WithFieldTree[] > <any> f().errors();
           return  computed(() => errors.map(e=>e.message).join(" "));
   }   
   
   isFieldValid(fieldName:string ){
    let f = this.formRef()[fieldName];
    if(f!=undefined)
      return !(f().invalid());
    else 
      return false;
  }

  classForField(fieldName:string) {
   let v= this.isFieldValid(fieldName);
  return {
    'ng-valid': v,     
    'ng-invalid': !v, 
    }
 }

}
