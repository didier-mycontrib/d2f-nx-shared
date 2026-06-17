import { ChangeDetectorRef, Component, effect, inject, input, InputSignal, model, ModelSignal, output, signal, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { D2fNgxTogglePanelComponent } from 'd2f-ngx-components';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { D2fNgxMessageComponent } from "d2f-ngx-components";
import { MyImportMaterialModule } from '../../common/imports/my-import-material.module';
import { AutoGenTdFormComponent } from './gen-crud-td-form/auto-gen-td-form/auto-gen-td-form.component';
import { cloneObject } from 'd2f-ngx-util';
import { ObjectHelper , FieldHelper } from 'd2f-ngx-util';
import { FieldInfoMap } from 'd2f-ngx-forms';
/*
Sous composant servant à :
  - éditer les partie d'un objet
  - déclencher des demandes d'actions ("new" , "add" , "update" , "delete")
  - afficher un message (notification, ...)
  Deux variantes par héritages:
     - GenCrudTdFormComponent (templateDriven)
     - GenCrudSignalFormComponent
*/

@Component({
  selector: 'd2fngx-crud-form',
  imports: [ ],
  template: '',
  styleUrl: './gen-crud-form.component.css'
})
export abstract class D2fNgxGenCrudFormComponent {


   public messageRef = model<string>("");

   public actionEvent = output<string>();//"new" , "add" , update" , "delete"

    //objectHelperRef :InputSignal<ObjectHelper<any,any> | null> = input(null,{transform: (objectHelper)=> <any> objectHelper });
    objectHelperRef =input<ObjectHelper<any,any> | null>(null);

    availableActions = input<string>("READ,NEW,ADD,UPDATE,DELETE"); // or "READ,DELETE" or "...,..." 

    modeRef = model("newOne"); //or "existingOne"

    //[(ngModel)]="deviseTempRef()!.code" , ....
    objectTempRef = model<any>(null);

    optionalSpecificSubFormTemplateRef = input<TemplateRef<any>>();
    specifSubFormAsAdditional=input(false);
  

    baseTitle ="selected entity";
    title = this.baseTitle;

    tablePanelOpenState=true;


   private modeEffect = effect(()=>{
      if(this.modeRef() == 'newOne'){
        this.title = this.baseTitle + " = newOne (temp)";
      }else{
        this.title = this.baseTitle + " = existingOne";
      }
    });

    ngOnInit(){
        this.baseTitle = "selected " + this.objectHelperRef()!.classHelper.entityName;
        this.title = this.baseTitle + " = newOne (temp)"
    }

    onAction(actionType:string){
         this.actionEvent.emit(actionType);
         //ExpressionChangedAfterItHasBeenCheckedError ???
    }
   
   
}
