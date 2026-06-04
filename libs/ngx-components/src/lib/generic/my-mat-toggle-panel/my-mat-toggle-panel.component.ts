import { Component, input, model, ViewEncapsulation } from '@angular/core';
import { MyImportMaterialModule } from '../../common/imports/my-import-material.module';

@Component({
  selector: 'my-mat-toggle-panel',
  imports: [MyImportMaterialModule],
  templateUrl: './my-mat-toggle-panel.component.html',
  styleUrls: ['./my-mat-toggle-panel.component.css']
})
export class MyMatTogglePanelComponent {

  public title = input("my-toogle-panel");

  panelOpenState=model(false);//model=input & ouptut

  constructor() { }

}
