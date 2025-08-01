import { Component, Input } from '@angular/core';
import { MenuItemComponent } from '../menu-item/component';

@Component({
  selector: 'comp-menu-list',
  imports: [
    MenuItemComponent,
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class MenuListComponent {
  @Input() categoryId: string | null = null;
}
