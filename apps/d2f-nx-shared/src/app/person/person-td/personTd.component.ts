import { NgClass, JsonPipe } from '@angular/common';
import { Component, computed, effect, Signal, signal } from '@angular/core';
import { email, form, FormField, min, minLength, pattern, required, ValidationError , FieldTree} from '@angular/forms/signals';
import { Genre, Person, PersonData } from '../../common/data/person';
import {D2fNgxBooleanFieldComponent, D2fNgxChoiceFieldComponent, computed_mapFieldErrorMessageSignal, D2fNgxDynamicFormComponent, isFieldValid, D2fNgxLabelInputFieldComponent, D2fNgxManySelectFieldComponent, D2fNgxReadOnlyFieldComponent} from 'd2f-ngx-forms';
import { FormsModule, NgForm } from '@angular/forms';



@Component({
  selector: 'app-person-td',
  imports: [FormsModule,JsonPipe,D2fNgxLabelInputFieldComponent,D2fNgxBooleanFieldComponent,
    D2fNgxChoiceFieldComponent,D2fNgxManySelectFieldComponent,D2fNgxReadOnlyFieldComponent],
  templateUrl: './personTd.component.html',
  styleUrl: './personTd.component.css',
})
export class PersonTdComponent {
  //src/app/common/data/person.ts with PersonData interface and Person class (implements PersonData)

  personData = new Person('','jean','Bon','jean.bon@xyz.com', 165 ,'2000-12-25');

  Genre=Genre;
  
  messagePerson = "";
  okPerson=true;

    onPerson(){
   //V1:
   this.okPerson=true;
   this.messagePerson="valeurs saisies=" + JSON.stringify(this.personData);
  }
  
 
}
