import { ChangeDetectorRef, Component, computed, effect, inject, input, InputSignal, model, ModelSignal, output, signal, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { D2fNgxTogglePanelComponent } from 'd2f-ngx-components';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { D2fNgxMessageComponent } from "d2f-ngx-components";
import { MyImportMaterialModule } from '../../../common/imports/my-import-material.module';
import { AbstractGenSubSignalFormData } from '../../abstract/AbstractGenSubFormData';
import { cloneObject } from 'd2f-ngx-util';
import { ObjectHelper , FieldHelper } from 'd2f-ngx-util';
import { D2fNgxDynamicFormComponent, FieldInfoMap } from 'd2f-ngx-forms';
import { D2fNgxGenCrudFormComponent } from '../gen-crud-form.component';
/*
Sous composant servant à :
  - éditer les partie d'un objet
  - déclencher des demandes d'actions ("new" , "add" , "update" , "delete")
  - afficher un message (notification, ...)
*/

@Component({
  selector: 'd2fngx-gen-crud-signal-form',
  imports: [CommonModule, FormsModule,
           D2fNgxTogglePanelComponent, D2fNgxMessageComponent,
          MyImportMaterialModule , D2fNgxDynamicFormComponent],
  templateUrl: './gen-crud-signal-form.component.html',
  styleUrl: './gen-crud-signal-form.component.css'
})
export class D2fNgxGenCrudSignalFormComponent extends D2fNgxGenCrudFormComponent {

  changedDetectorRef = inject(ChangeDetectorRef);

    formRef = input<any>(); //optional (may be undefined)
    //optional FieldInfo now as optional extraInfo in objectHelper/fieldHelper

    checkValid = computed(()=> (this.formRef())?this.formRef()().valid():true); //default as non blocking true


    subFormData : AbstractGenSubSignalFormData = 
     { form: this.formRef(),
      mode : this.modeRef()
     } ;

   mapFieldInfo:FieldInfoMap ={};//to build here from  optional extraInfo in objectHelper/fieldHelper


    override ngOnInit(){
            super.ngOnInit();
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
     

    ngOnChanges(changes:SimpleChanges){
       if(this.formRef()){
               let entityModelSignal = this.formRef()().controlValue;
               entityModelSignal.set(this.objectTempRef());
               this.formRef()().reset();
            }
      this.subFormData.form=this.formRef();
      this.subFormData.mode = this.modeRef();
    }

      checkChanged = computed( ()=> (this.formRef()?this.formRef()().dirty():true)); //default as non blocking true
  
}
