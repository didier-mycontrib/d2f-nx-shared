import { TestBed } from '@angular/core/testing';

import { TvaService } from './tva.service';

describe('TvaService', () => {
  let service: TvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('tva(200,20)==40', () => {
    expect(service.tva(200,20)).toBe(40);
  });

   //it() signifie "it should behave like that"
   //test() idem depuis angular 21 et vitest
   it('ttc(200,20)==240', () => {
    expect(service.ttc(200,20)).toBe(240);
  });


});

//à lancer via ng test 
//ou
//ng test --include=**/tva.service.spec.ts
