import { NgClass } from '@angular/common';
import { Component, computed, input, signal, Signal } from '@angular/core';
import { FormField , ValidationError  } from '@angular/forms/signals';
import { computed_mapFieldErrorMessageSignal, entityModelFromForm, isFieldValid } from '../../common/util/mySignalFormUtil';
import { LabelInputFieldComponent } from '../labelInputField/labelInputField.component';
import { BooleanFieldComponent } from '../booleanField/booleanField.component';
import { FieldInfo, FieldInfoMap } from '../../common/data/fieldInfo';
import { ChoiceFieldComponent } from '../choiceField/choiceField.component';
import { ManySelectFieldComponent } from '../manySelectField/manySelectField.component';

/*
En version signalForm
*/


@Component({
  selector: 'ngx-dynamic-form',
  imports: [FormField,NgClass,LabelInputFieldComponent,BooleanFieldComponent,ChoiceFieldComponent,ManySelectFieldComponent],
  templateUrl: './dynamicForm.component.html',
  styleUrls: ['./dynamicForm.component.css', '../../common/css/common.form.css'],
})
export class DynamicFormComponent {
  formRef = input<any>();
  withValidInvalidClasses = input(false);
  mapFieldInfo=input<FieldInfoMap>({});

  mapFieldErrorMessageSignal! :Signal<Map<string,string>>; //computed signal where errors messages are extracted , build as string and store in a map <fielName,ErrorString>
 

  entityModel!: object ;

  ngOnInit(){
   this.entityModel = entityModelFromForm(this.formRef());
   this.mapFieldErrorMessageSignal = computed_mapFieldErrorMessageSignal(this.formRef());
   for(let k of this.objectKeysArray(this.entityModel)){
    let v = (<any>this.entityModel)[k];
    let fieldInfo : FieldInfo = this.mapFieldInfo()[k];
    if(fieldInfo==undefined){
      fieldInfo = { }
      this.mapFieldInfo()[k]= fieldInfo;
    }
    if(fieldInfo.type==undefined)
         fieldInfo.type=typeof v;
    //console.log("k="+k + " v="+v + " type=" + this.mapFieldInfo()[k].type)
   }
  }

  
   objectKeysArray(obj:object):any[]{
          return Reflect.ownKeys(obj);
        }     

   //optional styles classes settings (ng-valid & ng-invalid)
   //only activated if [withValidInvalidClasses]='true' , default as false
  

  classForField(fieldName:string) {
   let v= isFieldValid(fieldName,this.formRef());
  return {
    'ngsf-valid': v,     
    'ngsf-invalid': !v, 
    }
 }

}
