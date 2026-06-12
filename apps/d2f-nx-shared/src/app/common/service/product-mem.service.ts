import { Injectable } from '@angular/core';
import { Product } from '../data/product';
import { GenericMemCrudService } from 'd2f-ngx-crud';

@Injectable({
  providedIn: 'root'
})
export class ProductMemService extends GenericMemCrudService<Product>{

  initMap(): void {
    this.objectsMap.set("abc34ef6",new Product("abc34ef6","cahier",2.45 , "150 pages , grands carreaux"));
    this.objectsMap.set("abc34ef5",new Product("abc34ef5","stylo",2.05 , "stylo bille bleu"));
    this.objectsMap.set("abc34ef4",new Product("abc34ef4","classeur",3.15 , "grand classeur"));
   
  }

  constructor() { 
    super();
    this.initMap();
  }
}
