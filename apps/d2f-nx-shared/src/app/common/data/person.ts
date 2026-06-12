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
     constructor(
       public  firstname : string ="",
       public  lastname : string ="",
       public  email : string ="",
       public taille :number=0,
       public  birthday : string ="",
       public celibataire : boolean=true,
       public genre : Genre = Genre.INCONNU,
       public  nationalite : string ="",
       public sports: string[]=[]){}
}
