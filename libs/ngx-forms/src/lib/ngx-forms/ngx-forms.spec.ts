import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxForms } from './ngx-forms';

describe('NgxForms', () => {
  let component: NgxForms;
  let fixture: ComponentFixture<NgxForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxForms],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
