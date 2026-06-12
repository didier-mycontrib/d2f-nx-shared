import {  computed, Signal } from '@angular/core';
import { FieldTree, ValidationError } from '@angular/forms/signals';

function objectKeysArray(obj:object):any[]{
    return Reflect.ownKeys(obj);
}

export function entityModelFromForm<T extends object>(form: FieldTree<T, string | number>):object{
    let entityModelSignal = form().controlValue;
    let entityModel = entityModelSignal();
    //console.log("entityModel=" + JSON.stringify(entityModel) );
    return entityModel;
}



//computed signal where errors messages are extracted , build as string and store in a map <fielName,ErrorString>
//returned value as :Signal<Map<string,string> 
//usage:
//  this.mapFieldErrorMessageSignal =computed_mapFieldErrorMessageSignal(this.xyzSignalForm);
// et  <span class="text-red-600">{{mapFieldErrorMessageSignal().get('a_field_name')}}</span>

export function computed_mapFieldErrorMessageSignal<T extends object>(form: FieldTree<T, string | number>):Signal<Map<string,string>>{
   let entityModel = entityModelFromForm(form);
   let mapFieldErrorMessageSignal :Signal<Map<string,string>> = computed(()=>{
    let map=new Map<string,string>();
      for(let key of objectKeysArray(entityModel)){
        let f = (<any>form)[key];
        let errors = <ValidationError.WithFieldTree[] > <any> f().errors();
        map.set(key,errors.map(e=>e.message).join(" "));
      }
    return map;
  });
  return mapFieldErrorMessageSignal;
}

//variante pour un seul champ:
export function computed_fieldErrorMessageSignal<T extends object>(form: FieldTree<T, string | number> , fieldName: string):Signal<string>{
   let fieldErrorMessageSignal :Signal<string> = computed(()=>{
        let f = (<any>form)[fieldName];
        let errors = <ValidationError.WithFieldTree[] > <any> f().errors();
       return errors.map(e=>e.message).join(" ");
  });
  return fieldErrorMessageSignal;
}


//********************************************************


export function  isFieldValid<T extends object>(fieldName:string , form: FieldTree<T, string | number>){
    let f = (<any>form)[fieldName];
    if(f!=undefined)
      return !(f().invalid());
    else 
      return false;
  }

  /*
  //usage of : isFieldValid:

classForField(fieldName:string) {
   let v= isFieldValid(fieldName,this.formRef());
   return {
    'ng-valid': v,     
    'ng-invalid': !v, 
    }
 }

 et

 <input [formField]="xyzForm.field_name" [ngClass]="classForField('field_name')"/>

 et

 input.ng-valid {
    border-left: 5px solid #42A948; 
  }

  input.ng-invalid {
    border-left: 5px solid #a94442; 
  }

 */
