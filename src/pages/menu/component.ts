import { Component } from '@angular/core';
import { AdvertComponent } from '../../components/advert/component';
import { MenuSectionComponent } from "../../components/menu-section/component";

const datasource = [
  {
    categoryId: "A83DB8C2-C471-4FD3-9685-7346FE76DB3D",
    icon: "/assets/media/menu/01.png",
    title: "Блины"
  },
  {
    categoryId: "CC855F28-EECE-4CAE-8790-6E9A3A039AEA",
    icon: "/assets/media/menu/02.png",
    title: "Супы"
  },
  {
    categoryId: "306343C5-3FA5-4E08-A37B-7EBD29775C41",
    icon: "/assets/media/menu/03.png",
    title: "Десерты"
  },
  {
    categoryId: "0C63C77C-2541-48EF-ACAA-141B39FC4823",
    icon: "/assets/media/menu/04.png",
    title: "Напитки"
  },
  {
    categoryId: "00000000-0000-0000-0000-000000000000",
    icon: "/assets/media/menu/00.png",
    title: "Движения"
  },
];

@Component({
  selector: 'app-menu',
  imports: [
    AdvertComponent,
    MenuSectionComponent
],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class MenuPage {
  readonly categories = datasource;
}
