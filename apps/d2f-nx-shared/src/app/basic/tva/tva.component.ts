import { DecimalPipe, JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed-pipe';
import { TvaService } from '../../common/service/tva.service';

class Cxy{
  constructor(public ref:string="?",
              public value:number=0){}
}

class User{
    constructor(public firstName:string="?",
                public lastName:string="?",
                public email:string="?"){}
}


@Component({
  selector: 'app-tva',
  imports: [FormsModule , DecimalPipe , ToFixedPipe, JsonPipe],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.css',
})
export class TvaComponent {
  ht = signal(200);
  taux=signal(20); //en %
  tvaService = inject(TvaService);

  /*
  tva=computed(()=>this.ht() * this.taux() / 100 );
  ttc=computed(()=>this.ht() + this.tva() );
  */

tva = computed(()=>this.tvaService.tva(this.ht(), this.taux()))
ttc =computed(()=> this.tvaService.ttc(this.ht(), this.taux()));

  tauxPossibles = [ 5 , 10, 20];



}
