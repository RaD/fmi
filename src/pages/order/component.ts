import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdvertComponent } from '../../components/advert/component';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { CartItem, PaymentMethod, urls } from '../../app/interface';

@Component({
  selector: 'app-order',
  imports: [
    CommonModule,
    RouterModule,
    AdvertComponent
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class OrderPage implements OnInit {
  urls = urls;
  cartItems: CartItem[] = [];
  totalPrice = 0;
  paymentMethods: PaymentMethod[] = [];
  selectedPaymentMethod: PaymentMethod | null = null;
  showPaymentModal = false;
  showExcludeModal = false;
  itemToExclude: CartItem | null = null;
  itemToExcludeIndex = -1;

  constructor(
    private cartService: CartService,
    private dataService: DataService
  ) {
    this.paymentMethods = this.dataService.getPaymentMethods();
    this.selectedPaymentMethod = this.paymentMethods[0];
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  protected updateQuantity(index: number, quantity: number): void {
    if (quantity <= 0) {
      this.showExcludeConfirmation(index);
    } else {
      this.cartService.updateQuantity(index, quantity);
    }
  }

  protected showExcludeConfirmation(index: number): void {
    this.itemToExclude = this.cartItems[index];
    this.itemToExcludeIndex = index;
    this.showExcludeModal = true;
  }

  protected confirmExclude(): void {
    if (this.itemToExcludeIndex >= 0) {
      this.cartService.removeFromCart(this.itemToExcludeIndex);
    }
    this.closeExcludeModal();
  }

  protected closeExcludeModal(): void {
    this.showExcludeModal = false;
    this.itemToExclude = null;
    this.itemToExcludeIndex = -1;
  }

  protected openPaymentModal(): void {
    this.showPaymentModal = true;
  }

  protected closePaymentModal(): void {
    this.showPaymentModal = false;
  }

  protected selectPaymentMethod(method: PaymentMethod): void {
    this.selectedPaymentMethod = method;
  }

  protected proceedToPayment(): void {
    if (this.selectedPaymentMethod) {
      window.location.href = `/${urls.PAYMENT}?method=${this.selectedPaymentMethod.id}`;
    }
  }

  protected clearCart(): void {
    this.cartService.clearCart();
  }
}
