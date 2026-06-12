import { Component, computed, effect, Signal, signal } from '@angular/core';
import { PersonTdComponent } from './person-td/personTd.component';
import { PersonDsfComponent } from './person-dsf/personDsf.component';
import { PersonSfComponent } from './person-sf/personSf.component';
import { TogglePanelComponent } from 'd2f-ngx-components';


@Component({
  selector: 'app-person',
  imports: [PersonTdComponent,PersonSfComponent,PersonDsfComponent,TogglePanelComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent {
  
}
