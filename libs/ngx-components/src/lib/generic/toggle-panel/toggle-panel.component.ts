import { Component, input, model } from '@angular/core';

@Component({
  selector: 'my-toggle-panel',
  imports: [],
  templateUrl: './toggle-panel.component.html',
  styleUrl: './toggle-panel.component.css',
})
export class TogglePanelComponent {
   panelOpenState=model(false); 
   title /* : string */ = input( 'default panel title' ); constructor() { }
}


