import { Component } from '@angular/core';
import { MenuActionsComponent } from '../menu-actions/component';

@Component({
  selector: 'comp-menu-item',
  imports: [
    MenuActionsComponent,
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class MenuItemComponent {

}
