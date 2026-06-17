import { Component, input, model, signal } from "@angular/core";
import { ObjectHelper , FieldHelper } from 'd2f-ngx-util';
import { D2fNgxTogglePanelComponent } from "../toggle-panel/toggle-panel.component";
import { NgStyle } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { D2fNgxMessageComponent } from "../my-message/my-message.component";


/*
composant servant à :
  - afficher une liste d'objets (avec colonnes selon essentialKeysArrayRef )
  - effectuer une sélection simple (model)
*/


@Component({
  selector: 'd2fngx-sort-object-table',
  imports: [NgStyle,FormsModule,D2fNgxTogglePanelComponent,D2fNgxMessageComponent],
  templateUrl: './sort-object-table.component.html',
  styleUrl: './sort-object-table.component.css'
})
export class D2fNgxSortObjectTableComponent {

  title="";
  titleWithSize="";
  
  objectHelperRef  = input<ObjectHelper<any,any> | null>(null);

  public messageRef = model<string>("");

  //liste des objets à afficher
  tabObjectsRef  = input<object[] | null> (null);

  //objet sélectionné (null au début):
  public selectedObjectRef = model<any>(null);

  //liste des parties de l'objet à afficher (dans colonnes):
  essentialKeysArrayRef =input<string[] | null>(null);

  tablePanelOpenState=true;

  sortBy=signal(""); //"" for no sort (or fieldName)
  sortDir=signal<"asc" | "dec" >("asc");
  
  setFieldHeaderStyles(keyField:string){
    //idKey en italic et sortBy key souligné:
    return {
      "text-decoration" :(this.sortBy() == keyField)?"underline":"none" ,
      "font-style" : (this.objectHelperRef()!.classHelper.idKeyName == keyField)?"italic":"normal",
    };
  }

  //sur click colonne
  onAdjustSort(keyField:string){
     if(this.sortBy()!=keyField){
           this.sortBy.set(keyField); //selection colonne de tri
           this.sortDir.set("asc"); //reset "asc" by default
           }
     else {
           this.sortDir.set((this.sortDir()=='asc')?'dec':'asc'); //inversion sens
     }
    this.refreshContentOrOrder();
  }
  
  compareFn():any{
    if(this.sortBy()=="") return null;
    let fieldHelper : FieldHelper | null = this.objectHelperRef()?.getFieldHelper(this.sortBy())??null;
    if(fieldHelper==null) return null;
    let compareFnStr : string | null = null;
    switch(fieldHelper.fieldType){
      case "string":
        if(this.sortDir()=="asc")
          compareFnStr = `(o1,o2)=>o1.${this.sortBy()}.localeCompare(o2.${this.sortBy()})`
        else 
          compareFnStr = `(o1,o2)=>o2.${this.sortBy()}.localeCompare(o1.${this.sortBy()})`
        break;
      case "number":
        if(this.sortDir()=="asc")
          compareFnStr = `(o1,o2)=>(o1.${this.sortBy()} - o2.${this.sortBy()})`
        else 
          compareFnStr = `(o1,o2)=>(o2.${this.sortBy()} - o1.${this.sortBy()})`
        break;
      case "boolean":
        if(this.sortDir()=="asc")
          compareFnStr = `(o1,o2)=>(o1.${this.sortBy()} === o2.${this.sortBy()})?0 : (o1.${this.sortBy()})?:-1:1`
        else 
          compareFnStr = `(o1,o2)=>(o1.${this.sortBy()} === o2.${this.sortBy()})?0 : (o2.${this.sortBy()})?:-1:1`
         break;
    }
    if(compareFnStr==null) return null;
    return eval(compareFnStr);
  }

  ngOnChanges(){
   this.refreshContentOrOrder();
  }

  refreshContentOrOrder(){
    let s = this.tabObjectsRef()?.length;
    this.titleWithSize=`${this.title} (size=${s})`;
    //console.log("titleWithSize="+this.titleWithSize);
    if(s){
      let compareFn :any = this.compareFn(); //selon this.sortBy && this.sortDir && fieldHelper
      if(compareFn)
          this.tabObjectsRef()?.sort(compareFn)??[];
    }
  }
  

  ngOnInit(){
    this.title = "list of " + this.objectHelperRef()?.classHelper.entityName;
    //console.log("GenCrudTableComponent.ngOnInit(),this.essentialKeysArrayRef()="+this.essentialKeysArrayRef())
  }

  objectEssentialValuesArray(obj:object):any[]{
    return this.objectHelperRef()?.objectEssentialValuesArray(obj)??[];
   }

   public onSelectObject(obj:any){
    //console.log("select object:" + JSON.stringify(obj));
    this.selectedObjectRef.set(obj);
    let id = this.objectHelperRef()?.getId(obj);
    this.messageRef.set(id+ " selected");
   }
  
}
