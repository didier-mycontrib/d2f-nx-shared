import { ChangeDetectorRef, Component, effect, inject, input, InputSignal, model, ModelSignal, output, signal, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TogglePanelComponent } from 'd2f-ngx-components';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MyMessageComponent } from "d2f-ngx-components";
import { MyImportMaterialModule } from '../../common/imports/my-import-material.module';
import { AutoGenTdFormComponent } from '../auto-gen-td-form/auto-gen-td-form.component';
import { AbstractGenSubFormData } from '../abstract/AbstractGenSubFormData';
import { cloneObject } from 'd2f-ngx-util';
import { ObjectHelper , FieldHelper } from 'd2f-ngx-util';
import { AutoGenSignalFormComponent } from '../auto-gen-signal-form/auto-gen-signal-form.component';
import { FieldInfoMap } from 'd2f-ngx-forms';
/*
Sous composant servant à :
  - éditer les partie d'un objet
  - déclencher des demandes d'actions ("new" , "add" , "update" , "delete")
  - afficher un message (notification, ...)
*/

@Component({
  selector: 'gen-crud-form',
  imports: [CommonModule, FormsModule, AutoGenTdFormComponent,AutoGenSignalFormComponent,
           TogglePanelComponent, MyMessageComponent,
          MyImportMaterialModule ],
  templateUrl: './gen-crud-form.component.html',
  styleUrl: './gen-crud-form.component.css'
})
export class GenCrudFormComponent {

  changedDetectorRef = inject(ChangeDetectorRef);

  /*
  //RESTRICTION , l'état "valid" ou "invalid" remonte mal  en mode template driven
  // si trop de niveau d'imbrication de sous composants:
  // <form #tdFormObject="ngForm">  in .html
  @ViewChild('tdFormObject', { read: NgForm }) tdFormObject!: NgForm;

  //en théorie this.tdFormObject.form.valid true or false , en pratique quasiment toujours true
  */

   public messageRef = model<string>("");

   public actionEvent = output<string>();//"new" , "add" , update" , "delete"

    //objectHelperRef :InputSignal<ObjectHelper<any,any> | null> = input(null,{transform: (objectHelper)=> <any> objectHelper });
    objectHelperRef =input<ObjectHelper<any,any> | null>(null);

    availableActions = input<string>("READ,NEW,ADD,UPDATE,DELETE"); // or "READ,DELETE" or "...,..." 

    modeRef = model("newOne"); //or "existingOne"

    //[(ngModel)]="deviseTempRef()!.code" , ....
    objectTempRef = model<any>(null);

    optionalSpecificSubFormTemplateRef = input<TemplateRef<any>>();

    formRef = input<any>(); //optional (may be undefined)
    mapFieldInfo=input<FieldInfoMap>({});//optional (may be empty)


    checkValid(){
      let valid =true;
       if(this.formRef()){
           valid = this.formRef()().valid();
       }
       return valid;
    }

    checkChanged(){
        let changed = this.hasBeenChanged();
        console.log("changed="+changed);
        return changed;
    }

    subFormData : AbstractGenSubFormData = 
     { obj: this.objectTempRef(),
      mode : this.modeRef()
     } ;

    baseTitle ="selected entity";
    title = this.baseTitle;

    tablePanelOpenState=true;

    originalObjectTemp : any = null;

    ngOnChanges(changes:SimpleChanges){
      this.originalObjectTemp = cloneObject(this.objectTempRef()); //for detect change attempt
      this.subFormData.obj=this.objectTempRef();
      this.subFormData.mode = this.modeRef();
    }

    changedWithSignalForm = false;

     hasBeenChanged():boolean{
        if(this.changedWithSignalForm) return true;
        /*else*/
        return this.basicHasBeenChanged();
     }

     basicHasBeenChanged():boolean{
      let changed=false;
      let arrayOfPropKeys = Reflect.ownKeys(this.objectTempRef());
         for(let key of arrayOfPropKeys){
           let originalFieldValue=this.originalObjectTemp[key];
           let fieldValue=this.objectTempRef()[key];
           if(fieldValue!=undefined && fieldValue != originalFieldValue)
             { changed=true; break; }
         }
      return changed;
   }

       dirtyEffect = effect(()=>{
            if(this.formRef()){
               if(this.formRef()().dirty()) {
                 console.log("dirty++")
                this.changedWithSignalForm=true;
               } else{
                 console.log("nodirty--")
                this.changedWithSignalForm=false;
               }
                  
                 //this.objectTempRef.set(cloneObject(this.formRef()().controlValue())) ;
                 //this.formRef()().reset();
               }
          });

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
         //ExpressionChangedAfterItHasBeenCheckedError not important here
    }
   
   
  
}
