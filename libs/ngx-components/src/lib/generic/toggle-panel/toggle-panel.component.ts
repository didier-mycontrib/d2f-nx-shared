import { NgClass } from '@angular/common';
import { Component, input, model } from '@angular/core';

@Component({
  selector: 'd2fngx-toggle-panel',
  imports: [NgClass],
  templateUrl: './toggle-panel.component.html',
  styleUrl: './toggle-panel.component.css',
})
export class D2fNgxTogglePanelComponent {
   panelOpenState=model(false); 
   withMargin=input(true); 
   title /* : string */ = input( 'default panel title' ); 

   constructor() { }

   ngOnInit(){
    //console.log("TogglePanelComponent.withMargin="+this.withMargin());
   }

   setNgClasses(){
    return {
      "mt-1": this.withMargin(),
      "mb-1": this.withMargin(),
      "mt-0": !this.withMargin(),
      "mb-0": !this.withMargin(),
    }
   }
}


