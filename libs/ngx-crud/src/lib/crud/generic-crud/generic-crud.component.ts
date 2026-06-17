import { ChangeDetectorRef, Component,  inject,  input, InputSignal, OnInit, output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { GenericCrudContext } from '../GenericCrudContext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenericCrudService, GenericWithUploadService } from '../../common/service/generic-crud-service';
import { cloneObject, copyObjectProperties, messageFromError } from 'd2f-ngx-util';
import { D2fNgxSortObjectTableComponent } from 'd2f-ngx-components';
import { D2fNgxGenCrudParamComponent } from '../gen-crud-param/gen-crud-param.component';
import { MatDialog } from '@angular/material/dialog';
import { D2fNgxConfirmDialogComponent } from 'd2f-ngx-components';
import { Observable } from 'rxjs';
import { D2fNgxGenCrudTdFormComponent } from '../gen-crud-form/gen-crud-td-form/gen-crud-td-form.component';
import { D2fNgxGenCrudSignalFormComponent } from '../gen-crud-form/gen-crud-signal-form/gen-crud-signal-form.component';

export interface GenericCrudState{
  selectedObject : any, //selected existing entity or null
  objectTemp : any, //temp entity to edit 
  mode: string, // "newOne" or "exitingOne"
  lastAction: string|null // ex: onNew , onSelected , ...
}

@Component({
  selector: 'd2fngx-generic-crud',
  imports:[CommonModule,FormsModule,
    D2fNgxSortObjectTableComponent,D2fNgxGenCrudTdFormComponent,
    D2fNgxGenCrudSignalFormComponent,D2fNgxGenCrudParamComponent],
  templateUrl: './generic-crud.component.html',
  styleUrls: ['./generic-crud.component.css']
})
export class D2fNgxGenericCrudComponent implements OnInit {

   private changeDetectorRef = inject(ChangeDetectorRef);

  public genericCrudContext  = input<GenericCrudContext<any,any> | null>(null);

  formRef = input<any>(); //optional signalFormRef (may be undefined)
  //optional FieldInfo now as optional extraInfo in objectHelper/fieldHelper


  //genericCrudService now in genericCrudContext
  genericCrudService(){
    return this.genericCrudContext()!.genericCrudService;
  }
  
  classHelper(){
    return this.genericCrudContext()!.objectHelper.classHelper;
  }

  objectHelper(){
    return this.genericCrudContext()!.objectHelper;
  }

  public optionalSpecificSubFormTemplateRef = input<TemplateRef<any>>();
  public specifSubFormAsAdditional=input(false);

  //this.genericCrudContext?.tabObjects of type T[]

  //selectedObject : any ;
  sSelectedObject = signal<any>(undefined);
 

  //[(ngModel)]="deviseTemp.code" , ....
  //objectTemp : any = null;
  sObjectTemp = signal<any>(null);
  
  //collectionMessage /*: string*/ ="";
  //formMessage/*: string*/ ="";
  collectionMessage /*: string*/ =signal("");
  formMessage/*: string*/ =signal("");
  
  mode  = "newOne"; //or "exitingOne"

  subFormCompRef : any = input<any>();

  genericCrudStateChange = output<GenericCrudState>();//event for special complex case

  withUpload=input(false);

 
  constructor() {
   }

  onReload(){
    this.genericCrudContext()!.onFindObjectsWithFilterDefs$()
    .subscribe(
      { next: (tabObjects)=>{ this.collectionMessage.set(this.classHelper().entityName + " reloaded");
                              if(this.genericCrudContext())
                                 this.genericCrudContext()!.tabObjects = tabObjects; 
                              this.changeDetectorRef.markForCheck(); } ,
       error: (err)=>{ this.collectionMessage.set(messageFromError(err,"erreur: echec rechargement liste via filtre")); }
    });
    this.sObjectTemp.set(this.objectHelper().buildEmptyObject());
  }

  ngOnInit(): void {
    //console.log("GenericCrudComponent.ngOnInit(): filterDefs="+JSON.stringify(this.genericCrudContext()?.filterDefs));
    if(this.genericCrudContext()==null)return;
    this.genericCrudContext()!.onGetAllObjects$()
    .subscribe(
      { next: (tabObjects)=>{ //console.log("GenericCrudComponent.ngOnInit , tabObjects="+JSON.stringify(tabObjects))
                              //console.log("GenericCrudComponent.ngOnInit , classHelper()="+JSON.stringify(this.classHelper()))
                              this.collectionMessage.set(this.classHelper().entityName + " loaded");
                              if(this.genericCrudContext())
                                 this.genericCrudContext()!.tabObjects = tabObjects; 
                              this.changeDetectorRef.markForCheck(); } ,
       error: (err)=>{ this.collectionMessage.set(messageFromError(err,"erreur: echec chargement liste (unauthorized?)")); }
    });
    this.sObjectTemp.set(this.objectHelper().buildEmptyObject());
    this.fireGenericCrudStateChangeEvent("onInit");
  }

  onActionEvent(actionType:string){
    if(this.formRef() && (actionType=="add" || actionType=="update")){
      //console.log("***" + JSON.stringify(this.formRef()().controlValue()));
      this.sObjectTemp.set(cloneObject(this.formRef()().controlValue()));
    }
    switch(actionType){
      case "new": this.onNew(); break;
      case "add": this.onAdd(); break;
      case "update": this.onUpdate(); break;
      case "delete": this.onDeleteAfterConfirm(); break;
    }
  }

  fireGenericCrudStateChangeEvent(lastAction:string|null=null){
     this.genericCrudStateChange.emit(
            {selectedObject:this.sSelectedObject(),
             objectTemp:this.sObjectTemp(),
             mode:this.mode,lastAction:lastAction})
  }

  onNew(){
    this.sSelectedObject.set(undefined); this.mode='newOne';
    this.formMessage.set("new one (to edit before add)");
    this.sObjectTemp.set(this.objectHelper().buildEmptyObject());
    this.fireGenericCrudStateChangeEvent("onNew");
  }

  onAdd(){
    let postResponseObservable : Observable<any> | null = null;
    if(this.withUpload()){
        console.log("generic-crud-component-onAdd withUpload")
        let genericCrudServiceWithUpload = <GenericWithUploadService> <any> this.genericCrudService();
        let genericCrudContext = this.genericCrudContext();
        let uploadFormDataPrepareFn = null;
        if(genericCrudContext)
          uploadFormDataPrepareFn = genericCrudContext.onUploadFormDataPrepareFn;
        if(uploadFormDataPrepareFn){
             const formData: FormData = uploadFormDataPrepareFn();
            postResponseObservable = genericCrudServiceWithUpload.uploadFormData$(formData);
        }
    }
    else {
      //standard/ordinary post request
      postResponseObservable = this.genericCrudService()?.postEntityObject$(this.sObjectTemp()) ?? null;
    }
    if(postResponseObservable)
      postResponseObservable.subscribe(
      { next: (savedObject)=>{ this.formMessage.set(this.classHelper().entityName + " added");
                                + " with " + this.objectHelper().extractKeyValueString(savedObject);
                                this.collectionMessage.set(this.formMessage());
                                this.addClientSide(savedObject); 
                                this.changeDetectorRef.markForCheck();
                              } ,
        error: (err)=>{ this.formMessage.set(messageFromError(err,"error: echec post",true,true)); }
    });
  }

  addClientSide(savedObject:any){
    this.genericCrudContext()?.tabObjects.push(savedObject);

    //this.sSelectedObject.set(savedObject); this.mode='existingOne';
      //or
    this.onNew();
  }

  readonly dialog = inject(MatDialog); 

  onDeleteAfterConfirm(){
   D2fNgxConfirmDialogComponent.confirmDialog$(this.dialog,"confirm delete")
      .subscribe( (isOk : boolean ) => {
        if(isOk) 
          this.onDelete();
      });
  }

  onDelete(){
    if(this.sSelectedObject()){
         let id = this.objectHelper().getId(this.sSelectedObject());
         this.genericCrudContext()?.onDeleteObject$(id)
             .subscribe(
              { next: ()=>{ this.collectionMessage.set(this.classHelper().entityName + " deleted");
                            console.log("GenericCrudComponent.onDelete() collectionMessage="+this.collectionMessage);
                            this.deleteClientSide(); 
                            this.changeDetectorRef.markForCheck();//to refresh GUI without signal in ZoneLess mode (defaut mode since angular 21)
                          } ,
               error: (err)=>{ this.formMessage.set(messageFromError(err,"error: echec suppression",true,true)); }
            });
    }
  }

  deleteClientSide(){
    if(this.sSelectedObject()){
      let indexToDelete = -1;
      this.genericCrudContext()?.tabObjects.forEach((obj,index)=>{if(obj==this.sSelectedObject()) indexToDelete=index; });
      if(indexToDelete>=0){
        this.genericCrudContext()?.tabObjects.splice(indexToDelete,1);
      }
    }
    this.onNew();
  }

  onUpdate(){
    this.genericCrudContext()?.onUpdateObject$(this.sObjectTemp())
    .subscribe(
     { next: (updatedObject)=>{  this.formMessage.set(this.classHelper().entityName + " updated");
                   this.collectionMessage.set(this.formMessage());
                   this.updateClientSide(updatedObject); } ,
      error: (err)=>{ this.formMessage.set(messageFromError(err,"error: echec update",true,true));}
   });
  }

  updateClientSide(updatedObject:any){
  //test imposé par typescript sur this.selectedObject potentiellement undefined
   if(this.sSelectedObject() != undefined){
    //Rappel: this.selectedObject est ici une référence
    //qui pointe directement sur le i eme objet du tableau this.tabObjects
    //(selon ligne sélectionnée)
        copyObjectProperties(updatedObject, this.sSelectedObject());
   }
  }

  //fonction évenementielle à appeler lorsque l'on
  //va sélectionner une des lignes du tableau
  onSelectObject(o : any ){
    //NB: o:any est passé par référence (comportement de java/javascript)
    //et donc ici o et this.selectedObject référencent
    //directement un des objets du tableau this.tabObjects
      this.sSelectedObject.set(o);  this.mode='existingOne';
      //via un clonage explicite , this.objectTemp est une copie
      //indépendante de this.selectedObject (et pas une référence sur l'objet original)
      this.sObjectTemp.set(cloneObject(this.sSelectedObject()));
      let id = this.objectHelper().getId(this.sSelectedObject());
      this.collectionMessage.set(id + " selected");
      this.formMessage.set("current "+ this.classHelper().entityName + "=" + id);
      this.fireGenericCrudStateChangeEvent("onSelected");
  }

  //cloneObject, copyObjectProperties , objectKeysArray, objectValuesArray(obj:object):any[]
  // now in util.js as functions


  //essentialKeysArray replaced by objectHelper.classHelper.essentialFieldNames

  
  //extractKeyValueString
  //and objectEssentialValuesArray(obj:object):any[]
  //now in objectHelper 


   isNoEditableId(attrName:string){
    if(this.classHelper().idKeyName != attrName) return false;
    /* else is key attr*/
    if(this.classHelper().withAutoGeneratedId)return true;
    if(this.sSelectedObject()!=null) return true;
    return false;
   }

}
