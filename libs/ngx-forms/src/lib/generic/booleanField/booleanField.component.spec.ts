import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooleanFieldComponent } from './booleanField.component';

describe('CheckboxFieldComponent', () => {
  let component: BooleanFieldComponent;
  let fixture: ComponentFixture<BooleanFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooleanFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BooleanFieldComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
