import { Component, computed, effect, input, signal, Signal, SimpleChanges } from '@angular/core';
import { AbstractFieldComponent } from '../abstractField';
import { FormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import { computed_fieldErrorMessageSignal } from '../../common/util/mySignalFormUtil';

@Component({
  selector: 'd2fngx-read-only-field',
  imports: [FormsModule,FormField,NgClass],
  templateUrl: './readOnlyField.component.html',
  styleUrls: ['./readOnlyField.component.css' , '../../common/css/common.form.css'],
})
export class D2fNgxReadOnlyFieldComponent extends AbstractFieldComponent{

  readonlyValue = signal<any>('');

  readonlyValueEffect = effect(()=>{
     if(this.fieldData()){
     this.readonlyValue.set(this.fieldData());
    }
    else if(this.formRef()){
        let entityModelSignal = this.formRef()().controlValue;
       this.readonlyValue.set(entityModelSignal()[this.name()]);
    }
    //console.log("ReadOnlyFieldComponent , readonlyValue="+this.readonlyValue());
  });

}
