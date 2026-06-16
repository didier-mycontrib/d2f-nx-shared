import { ObjectHelper , FieldHelper } from 'd2f-ngx-util';
import { GenericCrudHelper } from "./GenericCrudHelper";

export interface GenericCrudAbstractContextHelper<T,I> {
    objectHelper() : ObjectHelper<T,I>;
    crudHelper() : GenericCrudHelper<T,I> | null ;
}