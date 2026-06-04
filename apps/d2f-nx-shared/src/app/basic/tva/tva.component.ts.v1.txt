import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed-pipe';

@Component({
  selector: 'app-tva',
  imports: [FormsModule , DecimalPipe , ToFixedPipe],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.css',
})
export class TvaComponent {
  ht = 0;
  taux=20; //en %
  tva=0;
  ttc=0;

  tauxPossibles = [ 5 , 10, 20];

  onCalculerTvaEtTtc(){
    this.tva = this.ht * this.taux / 100;
    this.ttc = this.tva + this.ht;
  }

}
