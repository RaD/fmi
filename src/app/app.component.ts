import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdvertComponent } from './advert/component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AdvertComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'fmi';
}
