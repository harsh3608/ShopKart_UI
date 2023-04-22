import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCountComponent } from './cart-item-count.component';

describe('CartItemCountComponent', () => {
  let component: CartItemCountComponent;
  let fixture: ComponentFixture<CartItemCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
