import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../app/interface';

@Component({
  selector: 'comp-menu-item',
  imports: [],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class MenuItemComponent {
  @Input() menuItem!: MenuItem;
  @Output() addToCart = new EventEmitter<MenuItem>();

  protected onAddToCart(): void {
    if (this.menuItem.available) {
      this.addToCart.emit(this.menuItem);
    }
  }
}
