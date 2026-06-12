import { Component, OnInit } from '@angular/core';
import { Devise } from '../common/data/devise';
import { DeviseHelper } from '../common/helper/devise-helper';
//import { DeviseMemService } from '../common/service/devise-mem.service';
import { GenericCrudContext , GenericCrudComponent , FilterDef} from 'd2f-ngx-crud';
import { DeviseService } from '../common/service/devise-rest.service';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviseMemService } from '../common/service/devise-mem.service';

@Component({
  selector: 'app-devise',
  imports: [GenericCrudComponent,JsonPipe,FormsModule],
  templateUrl: './devise.component.html',
  styleUrl: './devise.component.css'
})
export class DeviseComponent {

  objectHelper = new DeviseHelper();
  genericCrudContext : GenericCrudContext<Devise,String> ;
  

  constructor(public deviseService : DeviseService  /*DeviseMemService*/) {
    this.genericCrudContext = new GenericCrudContext<Devise,String>(
      this.objectHelper,
      this.deviseService);

    this.genericCrudContext.filterDefs=[
      new FilterDef("serverSide" , "changeMini=",1,["0"]),
      new FilterDef("clientSide" , "change>=",1,["0"] , (obj:Devise)=>obj.change >= 0),
      new FilterDef("clientSide" , "code.startsWith ",1,["?"] , (obj:Devise)=>obj.code.startsWith('?')),
    ]
   }


}