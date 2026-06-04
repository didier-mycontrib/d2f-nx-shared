import { NgClass, JsonPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { email, form, FormField, min, minLength, pattern, required, ValidationError , FieldTree} from '@angular/forms/signals';
import { Person, PersonData } from '../common/data/person';
import {DynamicFormComponent} from 'd2f-ngx-forms';


@Component({
  selector: 'app-person',
  imports: [FormField,NgClass,JsonPipe,DynamicFormComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent {
  //src/app/common/data/person.ts with PersonData interface and Person class (implements PersonData)
   //personModel = signal<PersonData>({ firstname: '', lastname: '', email : '' , age: 0});
  //personModel = signal<PersonData>(new Person());
  personModel = signal<PersonData>(new Person('jean','Bon','jean.bon@xyz.com', 40));//form data as WritableSignal
      //that will be synchronized with inputs of form ([formField]="personForm.firstname" is bi-directionnal)


  //personForm = form(this.personModel); //version simple/élémentaire sans validateur
  personForm = form(this.personModel, (schemaPath) => {
    required(schemaPath.firstname, {message: 'firstname is required'});
    required(schemaPath.lastname, {message: 'lastname is required'});
    minLength(schemaPath.firstname, 2 , {message: 'firstname length must be at least 2'});
    email(schemaPath.email, { message: 'Please enter a valid email address' });
    min(schemaPath.age, 18, { message: 'You must be at least 18 years old' });
    pattern(schemaPath.lastname, /^[A-Z].+/ , {message: 'lastname must start by uppercase , at least 2 characters'});
    });

  

  messagePerson = "";
  okPerson=true;

  okEffect = effect( ()=>{ this.okPerson = ! this.personForm().invalid();  this.messagePerson="" })

  onPerson(){
   //V1:
   this.okPerson=true;
   this.messagePerson="valeurs saisies=" + JSON.stringify(this.personModel());
  }
  
/*
  onValidatePersonForm(){
    this.ok=true; this.message="";
    if(this.personForm.firstname().invalid()){
      this.ok=false;
      for(let e of this.personForm.firstname().errors())
          this.message += ` ${e.message} `
    }
    if( this.personForm.age().invalid()){
      this.ok=false;
      for(let e of this.personForm.age().errors())
          this.message += ` ${e.message} `
    }
  }
  */

/*

  firstnameError=computed(()=> this.personForm.firstname().errors().map(e=>e.message).join(" "));
  lastnameError=computed(()=> this.personForm.lastname().errors().map(e=>e.message).join(" "));
  emailError=computed(()=> this.personForm.email().errors().map(e=>e.message).join(" "));
  ageError=computed(()=> this.personForm.age().errors().map(e=>e.message).join(" "));



  isFieldValid(fieldName:string ){
    switch(fieldName){
      case "firstname": return  ! this.personForm.firstname().invalid();
      case "lastname": return  ! this.personForm.lastname().invalid();
      case "email": return  ! this.personForm.email().invalid();
      case "age": return  ! this.personForm.age().invalid();
      default : return false;
    }
  }

  classForField(fieldName:string) {
   let v= this.isFieldValid(fieldName);
  return {
    'ng-valid': v,     
    'ng-invalid': !v, 
    }
 }


 */         
}
