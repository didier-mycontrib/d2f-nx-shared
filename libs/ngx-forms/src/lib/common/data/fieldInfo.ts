//optional field extra meta data

export interface FieldInfo{
    //fieldName?:string; //name of field (may be already specified as associated key in map)
    label?:string; //specific label (different of name)
    fieldType?:string;  //field type (if not string)
    notEditable?:boolean; //for generated field as pk (auto-incr, uuid, ...)
    items?:any[]; //items to choose (for selection)
    pseudoEnum?:any; //to automatically  build items to select from type
}
//NB : signal forms custom metada in schema can only be of type string (not structured like this interface)
//==> need a parallel map (in angular 21,22)

// FieldInfo meta data can be stored :
// - in .extraInfo of FieldHelper 
// - FieldInfoMap 
// -  ...

export interface FieldInfoMap{
    [index: string] :  FieldInfo;
}



export type FieldLayout = "col" | "row";
/*
 - "col" by default  (label , input , error_msg ) always in same column 
   several columns if large display 
 - "row" with label and input in same row if not to small width
*/
