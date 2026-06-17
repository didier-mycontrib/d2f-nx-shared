import { NgClass, JsonPipe } from '@angular/common';
import { Component, computed, effect, Signal, signal } from '@angular/core';
import { email, form, FormField, min, minLength, pattern, required, ValidationError , FieldTree} from '@angular/forms/signals';
import { Genre, Person, PersonData } from '../../common/data/person';
import {computed_mapFieldErrorMessageSignal, DynamicFormComponent, FieldInfoMap, isFieldValid} from 'd2f-ngx-forms';


@Component({
  selector: 'app-person-dsf',
  imports: [FormField,NgClass,JsonPipe,DynamicFormComponent],
  templateUrl: './personDSf.component.html',
  styleUrl: './personDsf.component.css',
})
export class PersonDsfComponent {
  //src/app/common/data/person.ts with PersonData interface and Person class (implements PersonData)
  p1 = new Person('','jean','Bon','jean.bon@xyz.com', 165,'2000-12-25');
  p2 = new Person('','axelle','Aire','axelle.air@xyz.com', 155,'2000-12-22')
  persons = [this.p1,this.p2];
  currentPersonIndex=0;
  personModel = signal<PersonData>(this.p1);//form data as WritableSignal
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

  Genre = Genre;  

  personFieldInfoMap : FieldInfoMap = {
    celibataire : { label : 'situation'},
    birthday  :  { type: 'date' },
    genre : { pseudoEnum : this.Genre },
    nationalite : { items : [ 'francais' , 'allemand' , 'anglais' , 'espagnol' , 
                              'italien' , 'belge' , 'portugais' , 'autrichien' , 'polonais']},
    sports  :  { type: 'array' , items : ['football' , 'velo' , 'basket' , 'tennis' , 'running' , 'walk' ] },
    ref : { notEditable : true}
  }  

  msgUdpated=signal("");
  
  onInstanceSwitch(){
     this.currentPersonIndex++;
     if(this.currentPersonIndex>=2)this.currentPersonIndex=0;
     this.personModel.set(this.persons[this.currentPersonIndex]);
     this.msgUdpated.set("");
     this.personForm().reset();
  }

  messagePerson = "";
  okPerson=true;

  okEffect = effect( ()=>{ this.okPerson = ! this.personForm().invalid();  this.messagePerson="" ;
  })

  sValid = computed (()=> this.personForm().valid());

  dirtyEffect = effect(()=>{
    if(this.personForm().dirty())  
      this.msgUdpated.set("changed/dirty"); 
    else 
      this.msgUdpated.set("");
    });

  onRefreshNoDirty(){
      this.personForm().reset();
  }

  onPerson(){
   //V1:
   this.okPerson=true;
   this.messagePerson="valeurs saisies=" + JSON.stringify(this.personModel());
  }
  
}
