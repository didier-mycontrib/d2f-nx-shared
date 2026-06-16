import { NgClass } from '@angular/common';
import { Component, computed, input, signal, Signal } from '@angular/core';
import { FormField , ValidationError  } from '@angular/forms/signals';
import { computed_mapFieldErrorMessageSignal, entityModelFromForm, isFieldValid } from '../../common/util/mySignalFormUtil';
import { LabelInputFieldComponent } from '../labelInputField/labelInputField.component';
import { BooleanFieldComponent } from '../booleanField/booleanField.component';
import { FieldInfo, FieldInfoMap, FieldLayout } from '../../common/data/fieldInfo';
import { ChoiceFieldComponent } from '../choiceField/choiceField.component';
import { ManySelectFieldComponent } from '../manySelectField/manySelectField.component';
import { ReadOnlyFieldComponent } from '../readOnlyField/readOnlyField.component';

/*
En version signalForm
*/


@Component({
  selector: 'ngx-dynamic-form',
  imports: [FormField,NgClass,LabelInputFieldComponent,BooleanFieldComponent,ChoiceFieldComponent,ManySelectFieldComponent,ReadOnlyFieldComponent],
  templateUrl: './dynamicForm.component.html',
  styleUrls: ['./dynamicForm.component.css', '../../common/css/common.form.css'],
})
export class DynamicFormComponent {
  formRef = input<any>();
  mapFieldInfo=input<FieldInfoMap>({});
  fieldLayout = input<FieldLayout>('col'); //always in same col by defaut

  entityModel!: object ;

  ngOnInit(){
   this.entityModel = entityModelFromForm(this.formRef());
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
  
   dynFormCssClass(){
    if(this.fieldLayout()=='col')
      return{
         "md:grid-cols-2" : true,
         "xl:grid-cols-3" : true,
         "gap-x-3" : true,
         "gap-y-3" : true
      }
      else return {
          "xl:grid-cols-2" : true,
          "gap-x-5" : true,
          "sm:gap-y-3" : true,
          "md:gap-y-1" : true
      }
    }

}
