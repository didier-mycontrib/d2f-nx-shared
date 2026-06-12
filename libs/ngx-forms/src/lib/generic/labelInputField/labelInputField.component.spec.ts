import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelInputFieldComponent } from './labelInputField.component';

describe('LabelInputFieldComponent', () => {
  let component: LabelInputFieldComponent;
  let fixture: ComponentFixture<LabelInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelInputFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelInputFieldComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
