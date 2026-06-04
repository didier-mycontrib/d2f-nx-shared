import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TvaService {
   tva(ht:number ,taux_tva_pct:number){
    return ht * taux_tva_pct/100.0
  }
  ttc(ht:number ,taux_tva_pct:number){
    return ht * (1 + taux_tva_pct/100.0)
  }
}
