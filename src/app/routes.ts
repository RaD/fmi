import { Routes } from '@angular/router';
import { urls } from './interface';

export const routes: Routes = [
  {path: urls.NOT_WORKING, loadComponent: () => import(
    '../pages/not-working/component'
  ).then(m => m.NotWorkingPage)},
  {path: urls.WELCOME, loadComponent: () => import(
    '../pages/welcome/component'
  ).then(m => m.WelcomePage)},
  {path: urls.MENU, loadComponent: () => import(
    '../pages/menu/component'
  ).then(m => m.MenuPage)},
  {path: urls.ORDER, loadComponent: () => import(
    '../pages/order/component'
  ).then(m => m.OrderPage)},
  {path: urls.PAYMENT, loadComponent: () => import(
    '../pages/payment/component'
  ).then(m => m.PaymentPage)},
  {path: urls.PROCESS, loadComponent: () => import(
    '../pages/process/component'
  ).then(m => m.ProcessPage)},
  {path: urls.READY, loadComponent: () => import(
    '../pages/ready/component'
  ).then(m => m.ReadyPage)},
  {path: urls.YAML_CONSOLE, loadComponent: () => import(
    '../pages/yaml-console/component'
  ).then(m => m.YamlConsolePage)},

  {path: '', pathMatch: 'full', redirectTo: '/' + urls.WELCOME},
  {path: '**', redirectTo: '/' + urls.WELCOME},
];
