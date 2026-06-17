import { Component, input, Input, InputSignal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuDef } from '../../common/data/menu-def';



@Component({
  selector: 'd2flayout-quick-menu',
  templateUrl: './quick-menu.component.html',
  styleUrls: ['./quick-menu.component.css']
})
export class D2fNgxQuickMenuComponent  {

  private _defaultQuickMenuDefs : MenuDef[] = [
    new MenuDef("home","/ngr-home"),
    new MenuDef("login/out","/ngr-login-out")
  ];

 quickMenuDefs = input<MenuDef[]>(this._defaultQuickMenuDefs);
  

  constructor(private _router : Router) { }

  onNavigate(path:string | null): void {
    if(path !=null)
        this._router.navigateByUrl(path);
  }

}
