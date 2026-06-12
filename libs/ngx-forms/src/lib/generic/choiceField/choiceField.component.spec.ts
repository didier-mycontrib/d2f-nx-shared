import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoiceFieldComponent } from './choiceField.component';

describe('ChoiceFieldComponent', () => {
  let component: ChoiceFieldComponent;
  let fixture: ComponentFixture<ChoiceFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChoiceFieldComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
