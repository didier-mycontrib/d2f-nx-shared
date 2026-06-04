import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaComponent } from './tva.component';
import { TvaService } from '../../common/service/tva.service';

describe('TvaComponent', () => {
  let component: TvaComponent;
  let fixture: ComponentFixture<TvaComponent>;

  beforeEach(async () => {

   const stubServiceTva = {
        tva(ht:number ,taux_tva_pct:number){
        return 0;
      } ,
      ttc(ht:number ,taux_tva_pct:number){
        return ht * (1 + taux_tva_pct/100.0)
      }
    };


    await TestBed.configureTestingModule({
      imports: [TvaComponent] ,
      providers: [ {provide : TvaService, 
                    useValue : stubServiceTva } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
 it('tva(200,20)=40 from model', async () => {
    component.ht.set(200);
    component.taux.set(20); 
    fixture.changeDetectorRef.markForCheck();
      //fixture.detectChanges(); //not OK for ZoneLess mode
    await fixture.whenStable(); //OK with async for ZoneLess mode
    const compNativeElt = fixture.debugElement.nativeElement;
    let spanTvaElt = compNativeElt.querySelector('#spanTva');
    console.log("from model, tva:"  + spanTvaElt.textContent);
    expect(Number(spanTvaElt.textContent)).toBeCloseTo(40,2);
    // .toBeCloseTo(expectedValue,precision_as_nb_decimal)
    });
*/


  it('ttc(200,10)=220  from IHM', async () => {
      //Saisies de valeurs (via native_elements and DOM api):
      const compNativeElt = fixture.debugElement.nativeElement;
      let htInputElt = compNativeElt.querySelector("input[name='ht']");
      htInputElt.value=200;
      htInputElt.dispatchEvent(new Event('input'));
      /*  // Pour version simplifiée avec button et sans liste déroulante:
      let tauxTvaPctInputElt = compNativeElt.querySelector("input[name='tauxTvaPct']");
      tauxTvaPctInputElt.value=20;
      tauxTvaPctInputElt.dispatchEvent(new Event('input'));
      let calculButtonElt = 
         compNativeElt.querySelector("input[type='button'][value='calculer']");
      //calculButtonElt.dispatchEvent(new Event('click'));
      calculButtonElt.click();    */
       // Pour version sans button et avec liste déroulante:
      let tauxTvaPctSelectElt = compNativeElt.querySelector("select[name='taux']");
      let optionElt = null;
      for(let opt of tauxTvaPctSelectElt.children){
        if(opt.textContent=="10%"){  optionElt=opt;
         }
      }
      console.log("from ihm, optionElt.textContent:" + optionElt.textContent 
                          + " , optionElt.value:" + optionElt.value);
      tauxTvaPctSelectElt.value=optionElt.value;
      //fixture.detectChanges(); //not OK for ZoneLess mode
      await fixture.whenStable(); //OK with async for ZoneLess mode
      console.log("from ihm, tauxTvaPctSelectElt.value:" + tauxTvaPctSelectElt.value);
      tauxTvaPctSelectElt.dispatchEvent(new Event('change'));
       await fixture.whenStable(); 
      //Eventuelles vérifications des valeurs saisies et calculées dans le modèle:
      expect(Number(component.ht())).toBe(200);
      expect(component.taux()).toBe(10);    //avec ou sans parenthèses si signaux ou pas
      expect(component.ttc()).toBeCloseTo(220,2);
      //Vérifications importantes des valeurs calculées dans la vue (template html):
      let spanTtcElt = compNativeElt.querySelector('#spanTtc');
      console.log("from IHM, res:"  + spanTtcElt.textContent); 
      expect( Number( spanTtcElt.textContent ) ).toBeCloseTo(220,2);
      });


});

//lancer la commande suivante :
//ng test --include=**/tva.component.spec.ts
