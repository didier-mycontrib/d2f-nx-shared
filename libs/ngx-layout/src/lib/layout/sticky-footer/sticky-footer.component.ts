import { Component, input, Input, InputSignal, OnInit, TemplateRef } from '@angular/core';
import { D2fNgxQuickMenuComponent } from '../quick-menu/quick-menu.component';
import { D2fNgxLegalFooterComponent } from '../legal-footer/legal-footer.component';
import { inject, PLATFORM_ID } from "@angular/core";
import { CommonModule, isPlatformBrowser} from "@angular/common";
import { MenuDef } from '../../common/data/menu-def';
import { MyImportMaterialModule } from '../../common/imports/my-import-material.module';

@Component({
  selector: 'd2flayout-sticky-footer',
  imports: [D2fNgxQuickMenuComponent, MyImportMaterialModule,D2fNgxLegalFooterComponent,
           CommonModule
  ],
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.css']
})
export class D2fNgxStickyFooterComponent  {

  private readonly platform = inject(PLATFORM_ID);

  public expandLegalFooterInSmallSize = false;

  quickMenuDefs  = input<MenuDef[]>([]);

  //may be null/undefined:
  public legalFooterTemplateRef = input<TemplateRef<any>>();

  //legalFooter text (always visible like title/label)
  public legalFooterMainText = input("legal footer")

  constructor() { }

  public onTogglerLegalFooterClick(){
      this.expandLegalFooterInSmallSize = ! this.expandLegalFooterInSmallSize;
  }

}
