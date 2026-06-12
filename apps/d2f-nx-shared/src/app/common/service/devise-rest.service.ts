import { Injectable } from '@angular/core';
import { Observable, of, delay, map, catchError, tap, throwError  } from 'rxjs';
import { Devise } from '../data/devise';
import { HttpClient } from '@angular/common/http';
import { GenericRestCrudService } from 'd2f-ngx-crud';

export interface ConvertRes {
  source: string; //ex: "EUR",
  target: string; //ex: "USD",
  amount: number; //ex: 200.0
  result: number; //ex: 217.3913
};

@Injectable({
  providedIn: 'root'
})

export class DeviseService extends GenericRestCrudService<Devise> {

  public constructor(){
    super();
  }

  public override settingEntitiesNameAndApiBaseUrl(): void {
    //direct access with CORS autorisation and without reverse_proxy
    this.apiBaseUrl = "https://www.d-defrance.fr/tp/devise-api/v1";

    //indirect partial URL with reverse proxy 
    // (ng serve --proxy-config proxy.conf.json)
     // or other config in production mode
   // this.apiBaseUrl = "tp/devise-api/v1";

    this.entitiesName = "devises";
    
    console.log("apiBaseUrl="+this.apiBaseUrl);
    console.log("entitiesName="+this.entitiesName);
  }

  //putDevise$(d :Devise)  ==> putEntityObject$(id:any,obj : T)
  //getAllDevises$() ==> getAllObjects$()
  
  public convertir$(montant: number,
    codeDeviseSrc: string,
    codeDeviseTarget: string
  ): Observable<number> {
    const url = this.publicApiBaseUrl + "/convert"
      + `?source=${codeDeviseSrc}`
      + `&target=${codeDeviseTarget}&amount=${montant}`;
    //console.log( "url = " + url);
    return this.http.get<ConvertRes>(url)
      .pipe(
        map((res: ConvertRes) => res.result),
        tap( (montantConverti) => console.log(`convertir$ : montantConverti=${montantConverti}`)),
        catchError(error => {
          console.error('Error occurred:', error);
          
          //return of(0.0);// we can provide a fallback value
          return throwError(() => error);//we can re-throw this error after log or ...
        })
      );
  }
}