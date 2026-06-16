/*
export enum Genre {
  Homme, Femme , Inconnu
}
  //pas très pratique (codé comme 0 , 1 , 2 , ...)
*/
/*
type Genre = "Homme" | "Femme" | "Inconnu"
//ok mais pas pratique pour intération
*/
/*
const genresPossibles = ["Homme" , "Femme" , "Inconnu"];
type Genre = typeof genresPossibles[number];
//ok mais "Homme" plutot que Genre.Homme
*/
export const Genre = {
  HOMME: "HOMME",
  FEMME: "FEMME",
  INCONNU : "INCONNU"
} as const;
export type Genre = typeof Genre[keyof typeof Genre];


export interface PersonData {
  ref:string; 
  firstname: string;
  lastname: string;
  email: string;
  taille :number;
  birthday: string;
  celibataire : boolean;
  genre : Genre;
  nationalite: string;
  sports:string[];
}

export class Person implements PersonData {
     static last_num : number = 0; //for simple (in memory auto_incr)

     constructor(
       public ref : string = "",
       public  firstname : string ="",
       public  lastname : string ="",
       public  email : string ="",
       public taille :number=0,
       public  birthday : string ="",
       public celibataire : boolean=true,
       public genre : Genre = Genre.INCONNU,
       public  nationalite : string ="",
       public sports: string[]=[]){
        if(this.ref==""){
          Person.last_num = Person.last_num+1;
          this.ref = "p_" + Person.last_num;
        }
       }
}
