import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdvertComponent } from '../../components/advert/component';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { PaymentMethod, urls } from '../../app/interface';

@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    RouterModule,
    AdvertComponent
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class PaymentPage implements OnInit {
  urls = urls;
  paymentMethod: string = 'qr';
  paymentMethods: PaymentMethod[] = [];
  totalPrice = 0;
  showPaymentModal = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService
  ) {
    this.paymentMethods = this.dataService.getPaymentMethods();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentMethod = params['method'] || 'qr';
    });

    this.cartService.cartItems$.subscribe(() => {
      this.totalPrice = this.cartService.getTotalPrice();
    });

    // Simulate payment processing
    setTimeout(() => {
      window.location.href = `/${urls.PROCESS}`;
    }, 5000);
  }

  protected getPaymentMethod(id: string): PaymentMethod | undefined {
    return this.paymentMethods.find(m => m.id === id);
  }

  protected getPaymentTitle(): string {
    switch (this.paymentMethod) {
      case 'qr': return 'Отсканируйте QR-код';
      case 'card': return 'Следуйте инструкции на пин-паде';
      case 'sbp': return 'Оплата по СБП';
      default: return 'Оплата';
    }
  }

  protected getPaymentIcon(): string {
    return `/assets/media/payment/${this.paymentMethod}.svg`;
  }

  protected openPaymentModal(): void {
    this.showPaymentModal = true;
  }

  protected closePaymentModal(): void {
    this.showPaymentModal = false;
  }

  protected selectPaymentMethod(method: PaymentMethod | undefined): void {
    if (method) {
      window.location.href = method.url;
    } else {
      console.error('Метод оплаты не найден');
    }
  }
}
