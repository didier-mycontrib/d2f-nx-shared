import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxComponents } from './ngx-components';

describe('NgxComponents', () => {
  let component: NgxComponents;
  let fixture: ComponentFixture<NgxComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
