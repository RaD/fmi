import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMenuComponent } from './component';

describe('PaymentMenuComponent', () => {
  let component: PaymentMenuComponent;
  let fixture: ComponentFixture<PaymentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
