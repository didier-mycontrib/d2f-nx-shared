import { NgClass, JsonPipe } from '@angular/common';
import { Component, computed, effect, Signal, signal } from '@angular/core';
import { email, form, FormField, min, minLength, pattern, required, ValidationError , FieldTree} from '@angular/forms/signals';
import { Genre, Person, PersonData } from '../../common/data/person';
import {BooleanFieldComponent, ChoiceFieldComponent, computed_mapFieldErrorMessageSignal, DynamicFormComponent, isFieldValid, LabelInputFieldComponent, ManySelectFieldComponent, ReadOnlyFieldComponent} from 'd2f-ngx-forms';


@Component({
  selector: 'app-person-sf',
  imports: [FormField,NgClass,JsonPipe,DynamicFormComponent,
          LabelInputFieldComponent,BooleanFieldComponent,ChoiceFieldComponent,ManySelectFieldComponent,ReadOnlyFieldComponent],
  templateUrl: './personSf.component.html',
  styleUrl: './personSf.component.css',
})
export class PersonSfComponent {
  //src/app/common/data/person.ts with PersonData interface and Person class (implements PersonData)
  personModel = signal<PersonData>(new Person('','jean','Bon','jean.bon@xyz.com', 165 , '2000-12-25'));//form data as WritableSignal
      //that will be synchronized with inputs of form ([formField]="personForm.firstname" is bi-directionnal)


  //personForm = form(this.personModel); //version simple/élémentaire sans validateur
  personForm = form(this.personModel, (schemaPath) => {
    required(schemaPath.firstname, {message: 'firstname is required'});
    required(schemaPath.lastname, {message: 'lastname is required'});
    minLength(schemaPath.firstname, 2 , {message: 'firstname length must be at least 2'});
    email(schemaPath.email, { message: 'Please enter a valid email address' });
    min(schemaPath.taille, 44, { message: 'Your size should be at least 44 cm' });
    pattern(schemaPath.lastname, /^[A-Z].+/ , {message: 'lastname must start by uppercase , at least 2 characters'});
    });

  

  messagePerson = "";
  okPerson=true;
  Genre = Genre;

  okEffect = effect( ()=>{ this.okPerson = ! this.personForm().invalid();  this.messagePerson="" })

  onPerson(){
   //V1:
   this.okPerson=true;
   this.messagePerson="valeurs saisies=" + JSON.stringify(this.personModel());
  }
  


  //computed signal where errors messages are extracted , build as string and store in a map <fielName,ErrorString>
   mapFieldErrorMessageSignal :Signal<Map<string,string>>=computed_mapFieldErrorMessageSignal(this.personForm); 



  classForField(fieldName:string) {
   let v= isFieldValid(fieldName,this.personForm);
  return {
    'ng-valid': v,     
    'ng-invalid': !v, 
    }
 }
      

}
