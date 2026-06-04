import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxCrud } from './ngx-crud';

describe('NgxCrud', () => {
  let component: NgxCrud;
  let fixture: ComponentFixture<NgxCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCrud],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
