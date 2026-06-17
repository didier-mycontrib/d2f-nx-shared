import { Component, effect, input, InputSignal, model, ModelSignal, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ObjectHelper , FieldHelper, cloneObject } from 'd2f-ngx-util';
import { DynamicFormComponent , FieldInfoMap} from 'd2f-ngx-forms';
import { form, min, required, schema } from '@angular/forms/signals';

@Component({
  selector: 'auto-gen-signal-form',
  standalone : true,
  imports: [FormsModule,DynamicFormComponent],
  templateUrl: './auto-gen-signal-form.component.html',
  styleUrl: './auto-gen-signal-form.component.css'
})
export class AutoGenSignalFormComponent  {

    //[(ngModel)]="deviseTempRef()!.code" , ....
        objectTempRef :ModelSignal<any> = model(null);

        objectHelperRef =input<ObjectHelper<any,any> | null>(null);

        modeRef = model("newOne"); //or "existingOne"

        formRef = input<any>(); //optional (may be undefined)
        mapFieldInfo:FieldInfoMap ={};//to build here from  optional extraInfo in objectHelper/fieldHelper

    
         ngOnChanges(changes:SimpleChanges){
            if(this.formRef()){
               let entityModelSignal = this.formRef()().controlValue;
               entityModelSignal.set(this.objectTempRef());
               this.formRef()().reset();
            }
         }

         ngOnInit(){
            //building mapFieldInfo from fieldHelper extraInfo
            if(this.objectHelperRef()){
               let fieldHelperMap = this.objectHelperRef()?.classHelper.fieldHelperMap;
               if(fieldHelperMap){
               //console.log(fieldHelperMap.size)
               for(let k of fieldHelperMap.keys()){
                   let fieldHelper = this.objectHelperRef()?.getFieldHelper(k);
                   let fieldInfo = fieldHelper?.extraInfo;
                   //console.log(`for k=${k} ,fieldHelper = ${JSON.stringify(fieldHelper)} ,  fieldInfo = ${JSON.stringify(fieldInfo)}`)
                   if(fieldInfo)
                     this.mapFieldInfo[k]=fieldInfo;
                }
               }
            }
         }
     
      

}
