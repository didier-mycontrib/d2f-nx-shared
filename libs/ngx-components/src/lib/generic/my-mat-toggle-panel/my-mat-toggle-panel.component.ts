import { Component, input, model, ViewEncapsulation } from '@angular/core';
import { MyImportMaterialModule } from '../../common/imports/my-import-material.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'my-mat-toggle-panel',
  imports: [MyImportMaterialModule,NgClass],
  templateUrl: './my-mat-toggle-panel.component.html',
  styleUrls: ['./my-mat-toggle-panel.component.css']
})
export class MyMatTogglePanelComponent {

  public title = input("my-toogle-panel");

  panelOpenState=model(false);//model=input & ouptut

  constructor() { }

  withMargin=input(true);

  setNgClasses(){
    return {
      "my-toogle-panel-with-margin": this.withMargin(),
      "my-toogle-panel-without-margin": !this.withMargin(),
      "d2f-theme":true
    }
   }

}
