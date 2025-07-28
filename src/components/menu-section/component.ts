import { Component, Input } from '@angular/core';

@Component({
  selector: 'comp-menu-section',
  imports: [],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class MenuSectionComponent {
  @Input() categoryId!: string;
  @Input() img!: string;
  @Input() title!: string;
}
