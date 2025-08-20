import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdvertComponent } from '../../components/advert/component';
import { CartService } from '../../services/cart.service';
import { CartItem, urls } from '../../app/interface';

@Component({
  selector: 'app-process',
  imports: [
    CommonModule,
    RouterModule,
    AdvertComponent
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class ProcessPage implements OnInit, OnDestroy {
  urls = urls;
  cartItems: CartItem[] = [];
  completedItems: boolean[] = [];
  progress = 0;
  private progressInterval: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.completedItems = new Array(items.length).fill(false);
    });

    this.startProgress();
  }

  ngOnDestroy(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  private startProgress(): void {
    let completedCount = 0;
    
    this.progressInterval = setInterval(() => {
      if (completedCount < this.cartItems.length) {
        this.completedItems[completedCount] = true;
        completedCount++;
        this.progress = (completedCount / this.cartItems.length) * 100;
        
        if (completedCount === this.cartItems.length) {
          setTimeout(() => {
            window.location.href = `/${urls.READY}`;
          }, 1000);
        }
      }
    }, 2000);
  }

  protected getProgressDashArray(): string {
    const circumference = 2 * Math.PI * 185;
    const offset = circumference - (this.progress / 100) * circumference;
    return `${circumference - offset},${offset}`;
  }
}
