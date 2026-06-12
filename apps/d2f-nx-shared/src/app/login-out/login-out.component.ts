import { Component, computed, effect, inject } from '@angular/core';
import { Login, LoginResponse } from '../common/data/login';
import { UserSessionService ,UserSessionEx, UserSession } from 'd2f-ngx-session';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../common/service/login.service';
import { MyStorageUtilService } from 'd2f-ngx-util';
import { OAuth2SessionService } from '../common/service/oauth2-session.service';

@Component({
  selector: 'app-login-out',
  imports: [FormsModule,CommonModule],
  templateUrl: './login-out.component.html',
  styleUrl: './login-out.component.scss'
})

export class LoginOutComponent  {

  public userSessionService = inject(UserSessionService);//shared/service/...
  private _loginService = inject(LoginService);
  private _myStorageUtilService = inject(MyStorageUtilService);//pour mode ssr
  public isOk = false;
  public message="";

  public loginMode: "standalone-login-api" | "oauth2" ="oauth2";// by default or "standalone-login-api" ;

  public oauth2SessionService = inject(OAuth2SessionService);

  userSessionEx  = new UserSessionEx(undefined);
  sAuthenticated = computed(()=> this.userSessionService.sUserSession().authenticated);
  login  = new Login();

  private userSessionEffect = effect(()=>{
    this.userSessionEx= new UserSessionEx(this.userSessionService.sUserSession());
    switch(this.userSessionEx?.loginMode){
      case "standalone-login-api" :
        this.loginMode = "standalone-login-api"; break;
      case "oauth2" :
        this.loginMode = "oauth2"; break;
    }
  });

  ngOnInit(): void {
    /*
    this.userSessionService.bsUserSession$.subscribe(
      (userSession)=>{
        this.userSessionEx=new UserSessionEx(userSession);
        switch(userSession?.loginMode){
          case "standalone-login-api" :
            this.loginMode = "standalone-login-api"; break;
          case "oauth2" :
            this.loginMode = "oauth2"; break;
        }
      }
    )*/
    //console.log("LoginOutComponent/ngOnInit , login:"+JSON.stringify(this.login));
  }

  onLogout(){
    this.message="";
    this.userSessionEx  = new UserSessionEx(undefined);
    if(this.loginMode=="oauth2"){
      this.oauth2SessionService.oidcLogout();
      this.userSessionEx.loginMode="oauth2";
    }else{
      this.userSessionEx.loginMode="standalone-login-api";
    }
    this.userSessionService.setUserSession(this.userSessionEx);
    this.login  = new Login();
    this._myStorageUtilService.setItemInSessionStorage("access_token" , null);
  }

  onOAuth2Login(){
    this.oauth2SessionService.delegateOidcLogin();
  }

  onStandaloneLogin(){
    //v1 : without ckeck password , without server:
    /*
    this.userSessionEx.loginMode="standalone-login-api";
    this.userSessionEx.authenticated=true;
    this.userSessionEx  = new UserSessionEx(undefined);
    this.userSessionEx.userRolesAsString = this.login.roles;
    this.userSessionEx.userName = this.login.username;
    this.userSessionEx.authToken = "bearerTokenForConnectedUser";
    this.userSessionService.setUserSession(this.userSessionEx);
    */
   //v2: via server/_loginService
   this._loginService.postLogin$(this.login).subscribe({
    next: (loginResponse)=>{this._manageLoginResponse(loginResponse)},
    error : (err)=>{console.log(err)}
   });
  }

  private _manageLoginResponse(loginResponse:LoginResponse){
    console.log("loginResponse="+JSON.stringify(loginResponse));
    this.isOk=loginResponse.status;
    this.message=loginResponse.message;
    this._myStorageUtilService.setItemInSessionStorage("access_token" , loginResponse.token);
    if(loginResponse.status){
      this.userSessionEx  = new UserSessionEx(undefined);
      this.userSessionEx.loginMode="standalone-login-api";
      this.userSessionEx.authenticated=true;
      this.userSessionEx.userRolesAsString = loginResponse.scope;
      this.userSessionEx.userName = loginResponse.username;
      this.userSessionEx.authToken = loginResponse.token;
      this.userSessionService.setUserSession(this.userSessionEx);
    }else{ 
      this.userSessionService.setUserSession(new UserSessionEx(undefined));
    }
  }

}

