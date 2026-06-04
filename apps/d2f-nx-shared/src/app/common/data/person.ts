export interface PersonData {
  firstname: string;
  lastname: string;
  email: string;
  age:number;
}

export class Person implements PersonData {
     constructor(
       public  firstname : string ="",
       public  lastname : string ="",
       public  email : string ="",
       public age :number=0){}
}
