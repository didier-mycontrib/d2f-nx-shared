import { Component, inject, model, ModelSignal, output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MyImportMaterialModule } from '../../common/imports/my-import-material.module';
import { FilterDef } from '../../common/data/filter-def';
import { TemplateDialogComponent } from 'd2f-ngx-components';
import { cloneArrayOfSelfClonable, cloneObject } from 'd2f-ngx-util';
import { JsonPipe } from '@angular/common';

export interface ResultContext {
  tempFilterDefs : FilterDef[]
}

@Component({
  selector: 'gen-crud-param',
  imports: [MyImportMaterialModule,FormsModule,JsonPipe],
  templateUrl: './gen-crud-param.component.html',
  styleUrl: './gen-crud-param.component.css'
})
export class GenCrudParamComponent {

  public filterDefs :ModelSignal<any> = model([]);
  public filterDefsSumUp="";

  readonly dialog = inject(MatDialog);     
  @ViewChild('filtersDialogTemplate') filtersDialogTemplate!: TemplateRef<any>;
 
  public reload = output<void>();//reload event (after serverSideFilter change)

  resultContext : ResultContext = { tempFilterDefs : []};

  ngOnInit(){
    //console.log("GenCrudParamComponent.ngOnInit(): filterDefs="+JSON.stringify(this.filterDefs()));
    this.buildFilterDefsSumUp();
  }

  buildFilterDefsSumUp(){
    let filterDefsSumUpArray=[];
    for(let fd of this.filterDefs()){
      //let sumUp = fd.sumUpState();
      //let sumUp = fd.sumUpWithSide();//ok for debug phase but too large string
      let sumUp = fd.sumUpWithoutSide();
      if(sumUp != "") filterDefsSumUpArray.push(sumUp);  
    }
    this.filterDefsSumUp = filterDefsSumUpArray.join(";");
  }

  onReload(){
    this.reload.emit();
  }

  onDialogFiltersSettings(){
     this.resultContext = { tempFilterDefs : cloneArrayOfSelfClonable(this.filterDefs())};
      TemplateDialogComponent.templateDialog$(this.dialog, this.filtersDialogTemplate, "filter(s) settings" )
      .subscribe( (isOk : boolean) => {
        if(isOk) {
          console.log("onDialogFiltersSettings/isOk: tempFilterDefs ="+JSON.stringify(this.resultContext.tempFilterDefs));
          this.filterDefs.set(cloneArrayOfSelfClonable(this.resultContext.tempFilterDefs));
          this.buildFilterDefsSumUp();
          this.onReload(); //auto reload if ok
        }
      });
  }
  

}
