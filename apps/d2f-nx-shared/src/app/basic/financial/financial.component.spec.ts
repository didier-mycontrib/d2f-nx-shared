import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialComponent } from './financial.component';

describe('FinancialComponent', () => {
  let component: FinancialComponent;
  let fixture: ComponentFixture<FinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('nbMonth=120, amount=100000 , annualRate=2.5% should compute monthlyPayment: 942.7 ', async () => {
    //Saisies de valeurs (via native_elements and DOM api):
      const compNativeElt = fixture.debugElement.nativeElement;
      let nbMonthInputElt = compNativeElt.querySelector("input[name='nbMonth']");
      nbMonthInputElt.value=120;
      nbMonthInputElt.dispatchEvent(new Event('input'));
      let amountInputElt = compNativeElt.querySelector("input[name='amount']");
      amountInputElt.value=100000;
      amountInputElt.dispatchEvent(new Event('input'));
      let annualRateInputElt = compNativeElt.querySelector("input[name='annualRate']");
      annualRateInputElt.value=2.5;
      annualRateInputElt.dispatchEvent(new Event('input'));
    

      await fixture.whenStable(); //OK with async for ZoneLess mode
      
      /*
      //Eventuelles Vérifications des valeurs saisies et calculées dans le modèle:
      expect(component.nbMonth()).toBe(120); //  expect(Number(component.nbMonth())).toBe(120); without type=number on <input>
      expect(component.amount()).toBe(100000);
      expect(component.annualRate()).toBeCloseTo(2.5,1);
      */

      //Vérifications des valeurs calculées dans la vue (template html):
      let spanMonthlyPaymentElt = compNativeElt.querySelector('#monthlyPayment');
      console.log("from IHM,monthlyPayment:"  + spanMonthlyPaymentElt.textContent); 
      expect( Number( spanMonthlyPaymentElt.textContent ) ).toBeCloseTo(942.7,1);
  });
});


// ng test --include=**/financial.component.spec.ts
// nx test my-app --include=**/financial.component.spec.ts
