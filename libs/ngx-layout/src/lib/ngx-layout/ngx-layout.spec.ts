import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxLayout } from './ngx-layout';

describe('NgxLayout', () => {
  let component: NgxLayout;
  let fixture: ComponentFixture<NgxLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
