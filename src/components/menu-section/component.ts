import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() selected = new EventEmitter<string>();

  protected onSelect(): void {
    this.selected.emit(this.categoryId);
  }
}
