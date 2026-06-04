import { Component, computed, inject, signal } from '@angular/core';
import { FinancialService } from '../../common/service/financial.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-financial',
  imports: [FormsModule],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.css',
})
export class FinancialComponent {
  financialService = inject(FinancialService);
  nbMonth=signal<number>(120);
  amount=signal<number>(100000);
  annualRate=signal<number>(2.5);

  monthlyPayment=computed(()=>this.financialService.monthlyPaymentValue(this.nbMonth(),this.amount(),this.annualRate()));

  

  /*
  onComputeMonthlyPayment(){
    this.monthlyPayment = this.financialService.monthlyPaymentValue(this.nbMonth(),this.amount(),this.annualRate());
  }*/

}
