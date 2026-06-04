import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HighlightBackgroundOverDirective} from 'd2f-ngx-util';
import { MenuDef, D2fNgxLayoutComponent} from 'd2f-ngx-layout'

@Component({
  imports: [HighlightBackgroundOverDirective, RouterModule, D2fNgxLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = signal('d2f-nx-shared (test app)');

  legalFooterMainText ="this app legal footer"

  appMenuDefs : MenuDef[] = [
    new MenuDef("home","/ngr-home"),
    new MenuDef("public ...",null,[
      new MenuDef("basic","/ngr-basic"),
      //new MenuDef("demo","/ngr-demo"),
      //new MenuDef("conversion","/ngr-conversion")
    ]),
    
    /*
    new MenuDef("login-out","/ngr-login-out"),
    
    new MenuDef("admin ...",null,[
      new MenuDef("devises","/ngr-devise"),
      new MenuDef("products","/ngr-product"),
    ])
      */
  ];

  quickMenuDefs : MenuDef[] = [
      //new MenuDef("demo","/ngr-demo"),
      new MenuDef("basic","/ngr-basic"),
  ];

}
