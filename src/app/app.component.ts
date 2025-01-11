import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdvertComponent } from './advert/component';
import { ControlsComponent } from './controls/component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AdvertComponent, ControlsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'fmi';
}
