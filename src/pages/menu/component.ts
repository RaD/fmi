import { Component } from '@angular/core';
import { AdvertComponent } from '../../components/advert/component';
import { MenuSectionComponent } from "../../components/menu-section/component";
import { MenuListComponent } from '../../components/menu-list/component';
import { categories, items } from './datasource';

@Component({
  selector: 'app-menu',
  imports: [
    AdvertComponent,
    MenuSectionComponent,
    MenuListComponent,
],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class MenuPage {
  readonly categories = categories;
  readonly items = items;
  selectedCategory: string | null = null;

  protected onCategorySelected(categoryId: string): void {
    this.selectedCategory = categoryId;
  }
}
