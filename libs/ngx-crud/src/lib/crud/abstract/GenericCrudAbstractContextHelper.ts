import { ObjectHelper } from "../../common/helper/object-helper";
import { GenericCrudHelper } from "./GenericCrudHelper";

export interface GenericCrudAbstractContextHelper<T,I> {
    objectHelper() : ObjectHelper<T,I>;
    crudHelper() : GenericCrudHelper<T,I> | null ;
}