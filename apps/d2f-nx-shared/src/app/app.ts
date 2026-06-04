import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HighlightBackgroundOverDirective} from 'd2f-ngx-util';

@Component({
  imports: [HighlightBackgroundOverDirective, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'd2f-nx-shared';
}
