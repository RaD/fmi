import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdvertComponent } from '../components/advert/component';
import { ControlsComponent } from '../components/controls/component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AdvertComponent, ControlsComponent
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class AppComponent {
  title = 'fmi';
}
