import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithSimplePopupComponent } from './with-simple-popup.component';

describe('WithSimplePopupComponent', () => {
  let component: WithSimplePopupComponent;
  let fixture: ComponentFixture<WithSimplePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithSimplePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithSimplePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
