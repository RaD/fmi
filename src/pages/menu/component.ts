import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdvertComponent } from '../../components/advert/component';
import { MenuSectionComponent } from "../../components/menu-section/component";
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { Category, MenuItem, urls } from '../../app/interface';
import { MenuItemComponent } from '../../components/menu-item/component';

@Component({
  selector: 'app-menu',
  imports: [
    RouterModule,
    AdvertComponent,
    MenuSectionComponent,
    MenuItemComponent,
],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class MenuPage {
  urls = urls;
  categories: Category[] = [];
  selectedCategory: string = 'pancakes';
  menuItems: MenuItem[] = [];
  totalPrice = 0;
  itemCount = 0;

  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) {
    this.categories = this.dataService.getCategories();
    this.loadMenuItems();

    this.cartService.cartItems$.subscribe(items => {
      this.totalPrice = this.cartService.getTotalPrice();
      this.itemCount = this.cartService.getItemCount();
    });
  }

  get categoryTitle(): string | undefined {
    return this.categories.find(c => c.id === this.selectedCategory)?.title;
  }

  protected onCategorySelected(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.loadMenuItems();
  }

  private loadMenuItems(): void {
    this.menuItems = this.dataService.getMenuItems(this.selectedCategory);
  }

  protected clearCart(): void {
    this.cartService.clearCart();
  }

  protected addToCart(menuItem: MenuItem): void {
    this.cartService.addToCart(menuItem);
  }
}
