import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, MenuItem, Ingredient } from '../app/interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  addToCart(menuItem: MenuItem, quantity: number = 1, selectedIngredients: Ingredient[] = []): void {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(item => 
      item.menuItem.id === menuItem.id && 
      this.arraysEqual(item.selectedIngredients, selectedIngredients)
    );

    const ingredientsPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);
    const totalPrice = (menuItem.price + ingredientsPrice) * quantity;

    if (existingItemIndex >= 0) {
      currentItems[existingItemIndex].quantity += quantity;
      currentItems[existingItemIndex].totalPrice = 
        (menuItem.price + ingredientsPrice) * currentItems[existingItemIndex].quantity;
    } else {
      currentItems.push({
        menuItem,
        quantity,
        selectedIngredients,
        totalPrice
      });
    }

    this.cartItems.next([...currentItems]);
  }

  updateQuantity(itemIndex: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    if (quantity <= 0) {
      currentItems.splice(itemIndex, 1);
    } else {
      const item = currentItems[itemIndex];
      const ingredientsPrice = item.selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);
      item.quantity = quantity;
      item.totalPrice = (item.menuItem.price + ingredientsPrice) * quantity;
    }
    this.cartItems.next([...currentItems]);
  }

  removeFromCart(itemIndex: number): void {
    const currentItems = this.cartItems.value;
    currentItems.splice(itemIndex, 1);
    this.cartItems.next([...currentItems]);
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  getItemCount(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  private arraysEqual(a: Ingredient[], b: Ingredient[]): boolean {
    return a.length === b.length && a.every((val, index) => val.id === b[index].id);
  }
}