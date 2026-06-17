import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { D2fNgxInputDialogComponent } from '../input-dialog/input-dialog.component';
import { MyImportMaterialModule } from '../../common/imports/my-import-material.module';


export interface ConfirmDialogInput{
  question : string,
}

@Component({
  selector: 'd2fngx-confirm-dialog',
  imports: [MyImportMaterialModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class D2fNgxConfirmDialogComponent {

   
   public data = inject<ConfirmDialogInput>(MAT_DIALOG_DATA);
  
    readonly dialogRef = inject(MatDialogRef<D2fNgxInputDialogComponent>);
    
    onCancel(): void {
          this.dialogRef.close(false);
        }
    
    onOk(): void {
          this.dialogRef.close(true);
        }
 
    //helper function for simply call:
    static confirmDialog$(dialog : MatDialog,question:string){
          //NB: { disableClose : true } for modal dialog box
          return dialog.open(D2fNgxConfirmDialogComponent,
            { disableClose : true ,
              data: { question : question}
            }).afterClosed();
        }

}

/*
classical usage:
--------------
readonly dialog = inject(MatDialog); 

onDialogConfirmReset(){
    //NB: { disableClose : true } for modal dialog box
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      { disableClose : true ,
        data: { question : "reset age to 0 ?"}
      });

    dialogRef.afterClosed().subscribe(
      (isOk : boolean ) => {
        if(isOk) this.age=0;
      }
    )
  }
*/

/* simple usage:
---------------
readonly dialog = inject(MatDialog); 

onDialogConfirmReset(){
    D2fNgxConfirmDialogComponent.confirmDialog$(this.dialog,"reset age to 0 ?")
    .subscribe( (isOk : boolean ) => {
      if(isOk) this.age=0;
    });
  }
*/
