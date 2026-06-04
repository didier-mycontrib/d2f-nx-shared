import { Component } from '@angular/core';
import { FinancialComponent } from './financial/financial.component';
import {TogglePanelComponent} from 'd2f-ngx-components';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { TvaComponent } from './tva/tva.component';

@Component({
  selector: 'app-basic',
  imports: [FinancialComponent,TogglePanelComponent,CalculatriceComponent,TvaComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent {

  loanPanelOpen = true; //by default

}
