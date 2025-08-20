import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdvertComponent } from '../../components/advert/component';
import { CartService } from '../../services/cart.service';
import { urls } from '../../app/interface';

@Component({
  selector: 'app-ready',
  imports: [
    RouterModule,
    AdvertComponent
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class ReadyPage implements OnInit {
  urls = urls;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Auto redirect to welcome after 10 seconds
    setTimeout(() => {
      this.cartService.clearCart();
      window.location.href = `/${urls.WELCOME}`;
    }, 10000);
  }
}
