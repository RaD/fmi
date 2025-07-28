import { Routes } from '@angular/router';
import { urls } from './interface';

export const routes: Routes = [
  {path: urls.WELCOME, loadComponent: () => import(
    '../pages/welcome/component'
  ).then(m => m.WelcomePage)},
  {path: urls.MENU, loadComponent: () => import(
    '../pages/menu/component'
  ).then(m => m.MenuPage)},

  {path: '', pathMatch: 'full', redirectTo: '/' + urls.WELCOME},
  {path: '**', redirectTo: '/' + urls.WELCOME},
];
