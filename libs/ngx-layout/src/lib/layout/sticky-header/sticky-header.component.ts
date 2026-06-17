import { Component,  input, InputSignal, output,  } from '@angular/core';
import { D2fNgxQuickToolbarComponent } from '../quick-toolbar/quick-toolbar.component';
import { D2fNgxQuickMenuComponent } from '../quick-menu/quick-menu.component';
import { D2fNgxStatusBarComponent } from '../status-bar/status-bar.component';
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser} from "@angular/common";
import { MyImportMaterialModule } from '../../common/imports/my-import-material.module';
import { MenuDef } from '../../common/data/menu-def';

@Component({
  selector: 'd2flayout-sticky-header',
  imports: [ MyImportMaterialModule, D2fNgxQuickToolbarComponent,D2fNgxQuickMenuComponent,D2fNgxStatusBarComponent],
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.css']
})
export class D2fNgxStickyHeaderComponent  {

  private readonly platform = inject(PLATFORM_ID);

  title = input("my-angular-app");

  quickMenuDefs = input<MenuDef[]>([]);
  
  showStatusBar = true;

  togglerMenu = output<{}>();

  onTogglerMenuClick(){
    this.togglerMenu.emit({});
    //console.log("onTogglerMenuClick()")
  }

  constructor() { }

  onStatusHelp(){
     this.showStatusBar = ! this.showStatusBar;
     if(this.showStatusBar)
         this.autoHideForSmallSize();
  }

  ngOnInit(): void {
    this.autoHideForSmallSize();
  }

  autoHideForSmallSize(){
    
    if (isPlatformBrowser(this.platform)) {
      //console.log("window.innerWidth ="+window.innerWidth );
      if(window.innerWidth < 600){
        setTimeout(()=>{ this.showStatusBar=false;},2000);
      }
    }
  }

}
