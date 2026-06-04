import { TestBed } from '@angular/core/testing';

import { FinancialService } from './financial.service';

describe('FinancialService', () => {
  let service: FinancialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    console.log("FinancialService created");
  });

 it('nbMonth=120, amount=100000 , annualRate=2.5% should compute monthlyPayment: 942.7 ', () => {
  const nbMonth=120;
  const amount=100000;
  const annualRate = 2.5; 
  const monthlyPayment = service.monthlyPaymentValue(nbMonth,amount,annualRate);
  console.log("monthlyPayment="+monthlyPayment);
  expect(monthlyPayment).toBeCloseTo(942.7,1);
  });
});

// ng test --include=**/financial.service.spec.ts
// nx test my-app --include=**/financial.service.spec.ts
