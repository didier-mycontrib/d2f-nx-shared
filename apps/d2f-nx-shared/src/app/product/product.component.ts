import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../common/data/product';
import { ProductHelper } from '../common/helper/product-helper';
import { ProductMemService } from '../common/service/product-mem.service';
import { GenericCrudContext , D2fNgxGenericCrudComponent } from 'd2f-ngx-crud';
import { D2fNgxSortObjectTableComponent } from 'd2f-ngx-components';
import { email, form, min, minLength, pattern, required, schema, SchemaOrSchemaFn, SchemaPath } from '@angular/forms/signals';
import { D2fNgxBooleanFieldComponent, D2fNgxChoiceFieldComponent, D2fNgxLabelInputFieldComponent, D2fNgxManySelectFieldComponent, D2fNgxReadOnlyFieldComponent } from 'd2f-ngx-forms';


@Component({
  selector: 'app-product',
  imports: [D2fNgxGenericCrudComponent,D2fNgxSortObjectTableComponent,D2fNgxLabelInputFieldComponent,D2fNgxBooleanFieldComponent,D2fNgxChoiceFieldComponent,D2fNgxManySelectFieldComponent,D2fNgxReadOnlyFieldComponent],
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

   productDefaultInstanceModel = signal(this.objectHelper.buildEmptyObject());
   productSchema= schema<Product>((schemaPath)=> {
      required(schemaPath.label, {message: 'label is required'});
      required(schemaPath.price, {message: 'price is required'});
      min(schemaPath.price, 0.0, { message: 'price must be postive' });
    });
    productForm = form(this.productDefaultInstanceModel,this.productSchema);




}
