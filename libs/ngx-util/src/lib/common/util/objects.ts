
  export function cloneObject(obj:any):any{
    return JSON.parse(JSON.stringify(obj));
  }

  export function cloneAnyObjectWithAssign(obj:any):any{
    return Object.assign({},obj);
  }

  export interface SelfClonable<T>{
    clone():T ;
  }

  export function cloneArrayOfSelfClonable<T>(arr:SelfClonable<T>[]):T[]{
    let cArr : T[] = [];
    for(let selfClonableObj of arr){
       cArr.push(selfClonableObj.clone());
    }
    return cArr;
  }

  export function copyObjectProperties(source:object, target : object){
    let arrayOfPropKeys = Reflect.ownKeys(source);
    for(let key of arrayOfPropKeys){
     Reflect.set(target, key, Reflect.get(source,key));
    }
   }

  export function  objectKeysArray(obj:object):any[]{
    return Reflect.ownKeys(obj);
  }

  export function objectValuesArray(obj:object):any[]{
        let arrayOfPropKeys = Reflect.ownKeys(obj);
        let valuesArray = [];
        for(let key of arrayOfPropKeys){
            valuesArray.push(Reflect.get(obj,key));
        }
        return valuesArray;
     }

  
