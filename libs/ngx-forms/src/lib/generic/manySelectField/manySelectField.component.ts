import { Component, input } from '@angular/core';
import { AbstractFieldComponent } from '../abstractField';
import { FormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';

@Component({
  selector: 'd2fngx-many-select-field',
  imports: [FormsModule,FormField,NgClass],
  templateUrl: './manySelectField.component.html',
  styleUrl: './manySelectField.component.css',
})
export class D2fNgxManySelectFieldComponent extends AbstractFieldComponent {

  items=input<any[]>([]); //items (possible values for making a choice)
  selectedItems : any[]=[];
  selectionMap :any  = {}; //for array of checkbox { aaa : true , bbb : false , ccc : true }
  bigChoice = true; //if bigChoice : select/option else radio inputs

  ngOnInit(): void {
    //console.log("items="+JSON.stringify(this.items()));
    let nbItems=this.items().length;
    let totalItemsLength = 0; 
    for(const v of this.items()){
      if((typeof v)=='string')
           totalItemsLength += ( (<string>v).length + 2);
    }

    if(nbItems > 5 || totalItemsLength > 60)
      this.bigChoice=true;
    else
      this.bigChoice=false;

      if(this.bigChoice==false){
       for(const v of this.items()){
           this.selectionMap[v]=false;
        }
      }
  }

  onSelectedBoxChange(){
    this.selectedItems =[];
    for(const v of this.items()){
           if(this.selectionMap[v])
            this.selectedItems.push(v);
        }
    //console.log("selectedItems:"+JSON.stringify(selectedItems));
   this.onSelectedItemChange();
  }

  onSelectedItemChange(){
    if(this.formRef()){
        let entityModelSignal = this.formRef()().controlValue;
        entityModelSignal()[this.name()]=this.selectedItems;
    }else if(this.fieldData){
        this.fieldData.set(this.selectedItems);
    }
  }

}
