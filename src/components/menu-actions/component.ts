import { Component, Input } from '@angular/core';

@Component({
  selector: 'comp-menu-actions',
  imports: [],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class MenuActionsComponent {
  @Input() isAbsent: boolean = false;
}
