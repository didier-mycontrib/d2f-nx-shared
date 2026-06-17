import { ChangeDetectorRef, Component, effect, inject, input, InputSignal, model, ModelSignal, output, signal, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { D2fNgxTogglePanelComponent } from 'd2f-ngx-components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { D2fNgxMessageComponent } from "d2f-ngx-components";
import { MyImportMaterialModule } from '../../../common/imports/my-import-material.module';
import { AutoGenTdFormComponent } from './auto-gen-td-form/auto-gen-td-form.component';
import { AbstractGenSubTdFormData } from '../../abstract/AbstractGenSubFormData';
import { cloneObject } from 'd2f-ngx-util';
import { D2fNgxGenCrudFormComponent } from '../gen-crud-form.component';
/*
Sous composant servant à :
  - éditer les partie d'un objet
  - déclencher des demandes d'actions ("new" , "add" , "update" , "delete")
  - afficher un message (notification, ...)
*/

@Component({
  selector: 'd2fngx-gen-crud-td-form',
  imports: [CommonModule, FormsModule, AutoGenTdFormComponent,
           D2fNgxTogglePanelComponent, D2fNgxMessageComponent, MyImportMaterialModule ],
  templateUrl: './gen-crud-td-form.component.html',
  styleUrl: './gen-crud-td-form.component.css'
})
export class D2fNgxGenCrudTdFormComponent extends D2fNgxGenCrudFormComponent {

  //changedDetectorRef = inject(ChangeDetectorRef);

  /*
  //RESTRICTION , l'état "valid" ou "invalid" remonte mal  en mode template driven
  // si trop de niveau d'imbrication de sous composants:
  // <form #tdFormObject="ngForm">  in .html
  @ViewChild('tdFormObject', { read: NgForm }) tdFormObject!: NgForm;

  //en théorie this.tdFormObject.form.valid true or false , en pratique quasiment toujours true
  */


    subFormData : AbstractGenSubTdFormData = 
         { obj: this.objectTempRef(),
          mode : this.modeRef()
         } ;

    originalObjectTemp : any = null;

    ngOnChanges(changes:SimpleChanges){
       this.subFormData.obj=this.objectTempRef();
      this.subFormData.mode = this.modeRef();
      this.originalObjectTemp = cloneObject(this.objectTempRef()); //for detect change attempt
    }


     hasBeenChanged():boolean{
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

  
}
