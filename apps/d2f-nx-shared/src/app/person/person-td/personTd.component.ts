import { NgClass, JsonPipe } from '@angular/common';
import { Component, computed, effect, Signal, signal } from '@angular/core';
import { email, form, FormField, min, minLength, pattern, required, ValidationError , FieldTree} from '@angular/forms/signals';
import { Genre, Person, PersonData } from '../../common/data/person';
import {BooleanFieldComponent, ChoiceFieldComponent, computed_mapFieldErrorMessageSignal, DynamicFormComponent, isFieldValid, LabelInputFieldComponent, ManySelectFieldComponent, ReadOnlyFieldComponent} from 'd2f-ngx-forms';
import { FormsModule, NgForm } from '@angular/forms';



@Component({
  selector: 'app-person-td',
  imports: [FormsModule,JsonPipe,LabelInputFieldComponent,BooleanFieldComponent,
    ChoiceFieldComponent,ManySelectFieldComponent,ReadOnlyFieldComponent],
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
