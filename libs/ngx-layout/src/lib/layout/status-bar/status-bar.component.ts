import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { UserSessionService , UserSessionEx } from 'd2f-ngx-session';


@Component({
  selector: 'd2flayout-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class D2fNgxStatusBarComponent  {

  private _userSessionService = inject(UserSessionService);

  /*
  public userSessionEx : UserSessionEx = new UserSessionEx(undefined);

  private userSessionEffect = effect(()=>{
      this.userSessionEx= new UserSessionEx(this._userSessionService.sUserSession());
  });
  */

  public sUserSessionEx = computed(()=>new UserSessionEx(this._userSessionService.sUserSession()));


    /*
  constructor(){
    this._userSessionService.bsUserSession$.subscribe(
      (userSession)=>{
        this.userSessionEx=new UserSessionEx(userSession);
       // console.log("StatusBarComponent , userSessionEx="+JSON.stringify(this.userSessionEx))
      }
    )
  }
    */
}
