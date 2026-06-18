import { Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { WithSimplePopupComponent } from './with-simple-popup/with-simple-popup.component';
import { D2fNgxConfirmDialogComponent, D2fNgxInputDialogComponent, D2fNgxTemplateDialogComponent , D2fNgxGenericCardComponent } from 'd2f-ngx-components';
import { HighlightBackgroundOverDirective, HighlightBorderOverDirective } from 'd2f-ngx-util';


@Component({
  selector: 'app-home',
  imports: [HighlightBackgroundOverDirective, HighlightBorderOverDirective,FormsModule,
    WithSimplePopupComponent , D2fNgxGenericCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  age=signal(0);
  readonly dialog = inject(MatDialog); 
  ageColor=signal('black');
  divBackgroundColor=signal("lightyellow");
  
  @ViewChild('backColorChoose') //<ng-template #backColorChoose >
  backColorChooseTemplate!: TemplateRef<any>;

  @ViewChild('basicAgeInput') //<ng-template #basicAgeInput >
  basicAgeInputTemplate!: TemplateRef<any>;

  bgColorDialogContext = { bgColor : this.divBackgroundColor()};
  basicAgeDialogContext = { age : this.age()};

  onDialogAge(){
          D2fNgxInputDialogComponent.inputDialog$(this.dialog,"age")
          .subscribe( (result : string ) => {
            if(result!="")
               this.age.set(Number(result));
          });
  }

  onDialogChooseColor(){
    D2fNgxInputDialogComponent.inputChoiceDialog$(this.dialog,"color",["black","red","green","blue","orange"],this.ageColor())
    .subscribe( (result : string ) => {
      console.log("onDialogChooseColor result = "+result)
      this.ageColor.set(result);
    })
  }

  onDialogConfirmReset(){
    D2fNgxConfirmDialogComponent.confirmDialog$(this.dialog,"reset age to 0 ?")
    .subscribe( (isOk : boolean ) => {
      if(isOk) this.age.set(0);
    });
  }
  

  onDialogChooseBackColor(){
    
    D2fNgxTemplateDialogComponent.templateDialog$(this.dialog, this.backColorChooseTemplate, "background color choice" )
    .subscribe( (isOk : boolean) => {
      if(isOk) 
        this.divBackgroundColor.set(this.bgColorDialogContext.bgColor);
    });
  }

  onBasicTemplateDialogAge(){
    /* NB:
        disableClose : true for modal 
        TemplateDialogComponent of shared/component/generic/template-dialog
        required data with .title of .template as TemplateRef
    */
   /*
    const dialogRef = this.dialog.open(TemplateDialogComponent,
          { disableClose : true ,
            data: { title : "How old are you ?" , template : this.basicAgeInputTemplate}
          });
    
        dialogRef.afterClosed().subscribe(
          (isOk : boolean) => {
              if(isOk) this.age.set(Number(this.basicAgeDialogContext.age));
          }
        );
    */

        D2fNgxTemplateDialogComponent.templateDialog$(this.dialog,this.basicAgeInputTemplate,"How old are you ?")
        .subscribe(
          (isOk : boolean) => {
              if(isOk) this.age.set(Number(this.basicAgeDialogContext.age));
          }
        );


  }

}
