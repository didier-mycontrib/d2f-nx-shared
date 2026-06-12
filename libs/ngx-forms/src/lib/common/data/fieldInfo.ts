//optional field extra meta data

export interface FieldInfo{
    label?:string; //specific label (different of name)
    type?:string;  //field type (if not string)
    items?:any[]; //items to choose (for selection)
    pseudoEnum?:any; //to automatically  build items to select from type
}

export interface FieldInfoMap{
    [index: string] :  FieldInfo;
}