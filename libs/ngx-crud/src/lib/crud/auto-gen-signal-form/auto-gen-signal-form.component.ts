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
        mapFieldInfo=input<FieldInfoMap>({});//optional (may be empty)

    
         ngOnChanges(changes:SimpleChanges){
            if(this.formRef()){
               let entityModelSignal = this.formRef()().controlValue;
               entityModelSignal.set(this.objectTempRef());
               this.formRef()().reset();
            }
         }

     
      

}
