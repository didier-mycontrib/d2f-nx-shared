//optional field extra meta data

export interface FieldInfo{
    label?:string; //specific label (different of name)
    type?:string;  //field type (if not string)
    notEditable?:boolean; //for generated field as pk (auto-incr, uuid, ...)
    items?:any[]; //items to choose (for selection)
    pseudoEnum?:any; //to automatically  build items to select from type
}

export interface FieldInfoMap{
    [index: string] :  FieldInfo;
}



export type FieldLayout = "col" | "row";
/*
 - "col" by default  (label , input , error_msg ) always in same column 
   several columns if large display 
 - "row" with label and input in same row if not to small width
*/