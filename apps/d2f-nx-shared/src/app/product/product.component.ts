import { Component, OnInit } from '@angular/core';
import { Product } from '../common/data/product';
import { ProductHelper } from '../common/helper/product-helper';
import { ProductMemService } from '../common/service/product-mem.service';
import { GenericCrudContext , GenericCrudComponent } from 'd2f-ngx-crud';
import { SortObjectTableComponent } from 'd2f-ngx-components';


@Component({
  selector: 'app-product',
  imports: [GenericCrudComponent,SortObjectTableComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  objectHelper = new ProductHelper();
  genericCrudContext : GenericCrudContext<Product,String|null> ;
  //specific subpart for Devise or Contect or other Entity
  //this specific subpart is based on sub-sub-part "GenericContexHelper" implements by this class .

  constructor(public productService : ProductMemService) {
    this.genericCrudContext = 
      new GenericCrudContext<Product,String|null>(this.objectHelper,
                                                 this.productService);
   }

   tempProducts = [
    new Product("p1","cahier" , 2.1 , "grand cahier"),
    new Product("p2","stylo" , 1.1 , "stylo bille bleu"),
   ]

   selectedObject : Product | null = null;
   collectionMessage="";

   onSelectObject(selectedObject:Product|null){
    console.log("new selected object =" + JSON.stringify(selectedObject) )
   }





}
