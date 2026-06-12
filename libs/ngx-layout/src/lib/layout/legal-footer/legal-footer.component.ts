import { Component, input, Input, model, OnInit, TemplateRef } from '@angular/core';
import { inject, PLATFORM_ID } from "@angular/core";
import { CommonModule, isPlatformBrowser} from "@angular/common";
import { MyMatTogglePanelComponent} from 'd2f-ngx-components'; 
//import { TogglePanelComponent} from 'd2f-ngx-components';

@Component({
  selector: 'mylayout-legal-footer',
  imports: [CommonModule , MyMatTogglePanelComponent ],
  templateUrl: './legal-footer.component.html',
  styleUrls: ['./legal-footer.component.css']
})
export class LegalFooterComponent  {

  footerPanelExpand = model(false);

 //may be null/undefined:
 public legalFooterTemplateRef = input<TemplateRef<any>>();

 //legalFooter text (always visible like title/label)
 public legalFooterMainText = input("legal footer")

 private readonly platform = inject(PLATFORM_ID);

  constructor() { }

  ngOnInit(){
    if (isPlatformBrowser(this.platform)) {
      //console.log("window.innerWidth ="+window.innerWidth );
      if(window.innerWidth < 600){
         this.footerPanelExpand.set(true);
      }else{
        this.footerPanelExpand.set(false);
      }
    }
  }

}
