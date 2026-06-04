import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SimplePopupComponent } from 'd2f-ngx-components';


@Component({
  selector: 'app-with-simple-popup',
  imports: [SimplePopupComponent,FormsModule,CommonModule],
  templateUrl: './with-simple-popup.component.html',
  styleUrl: './with-simple-popup.component.css'
})
export class WithSimplePopupComponent {

  age=0
  basicAgeDialogContext = { age : this.age};

  toBeShown = false;

  showAgePopup() {
	this.toBeShown = true;
  }

  handlePopupResult(ok:boolean) {
    console.log("ok="+ok);
	  this.toBeShown = false;
    if(ok){
      this.age=this.basicAgeDialogContext.age;
    }
  }

}
