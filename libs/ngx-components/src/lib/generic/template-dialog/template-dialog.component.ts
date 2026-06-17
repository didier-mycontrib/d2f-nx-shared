import { Component, inject, TemplateRef } from '@angular/core';
import { MyImportMaterialModule } from '../../common/imports/my-import-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

export interface TemplateDialogInput{
  title : string|null,
  template : TemplateRef<any>
}

@Component({
  selector: 'd2fngx-template-dialog',
  imports: [MyImportMaterialModule,FormsModule,CommonModule],
  templateUrl: './template-dialog.component.html',
  styleUrl: './template-dialog.component.css'
})
export class D2fNgxTemplateDialogComponent {

    public data = inject<TemplateDialogInput>(MAT_DIALOG_DATA);
    value : any = "";

    ngOnInit(){
        if(this.data.title==undefined)
          this.data.title="modal dialog (settings)";
      }
    
      readonly dialogRef = inject(MatDialogRef<D2fNgxTemplateDialogComponent>);
      
      onCancel(): void {
            this.dialogRef.close(false);
          }
      
      
      onOk(): void {
            //result data are in external calling component contex (ex: this.resultContext)
            this.dialogRef.close(true);
          }

      //helper function for simply call:
      static templateDialog$(dialog : MatDialog,template: TemplateRef<any> , title : string|null = null){
                      //NB: { disableClose : true } for modal dialog box
            return dialog.open(D2fNgxTemplateDialogComponent,
                    { disableClose : true ,
                      data:  { title : title , template : template}
                  }).afterClosed();
        }
          
}
