import { Component, input } from '@angular/core';
import { AbstractFieldComponent } from '../abstractField';
import { FormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ngx-choice-field',
  imports: [FormsModule,FormField,NgClass],
  templateUrl: './choiceField.component.html',
  styleUrl: './choiceField.component.css',
})
export class ChoiceFieldComponent extends AbstractFieldComponent {

  pseudoEnum = input<any>(null); //as constObjectWithIterableKeys
  items=input<any[]>([]); //items (possible values for making a choice)
  
  bigChoice = true; //if bigChoice : select/option else radio inputs

  ngOnInit(): void {
    if(this.pseudoEnum()!=null && this.items().length==0){
      //console.log("iterableTypeObject="+JSON.stringify(this.constObjectWithIterableKeys()));
      for(let k in this.pseudoEnum()){
        let v=this.pseudoEnum()[k];
        //console.log("v="+v);
         this.items().push(v);
       }
    }
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
  }

}
