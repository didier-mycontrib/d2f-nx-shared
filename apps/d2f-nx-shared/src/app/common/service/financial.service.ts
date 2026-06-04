import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FinancialService {
     monthlyPaymentValue(nbMonth : number, amount : number , annualRate : number):number {
      let monthRate = (annualRate / 12)/100;
      return (amount * monthRate) / ( 1 - Math.pow(1+monthRate, -nbMonth));
     }
}
