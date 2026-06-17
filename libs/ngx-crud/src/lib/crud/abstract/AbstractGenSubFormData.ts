/*
AbstractGenSubFormData est une vision abstraite
des données du sous formulaire de saisie (spécifique)
.mode ="newOne" or "existingOne"
.obj = objet temporaire à saisir
*/

export interface AbstractGenSubTdFormData {
    obj : object;
    mode : string;
}

export interface AbstractGenSubSignalFormData {
    form : any;
    mode : string;
}