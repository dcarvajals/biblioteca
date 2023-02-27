import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarComponent } from './ejemplar.component';

describe('EjemplarComponent', () => {
  let component: EjemplarComponent;
  let fixture: ComponentFixture<EjemplarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
