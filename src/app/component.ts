import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from '../pages/welcome/component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    WelcomeComponent,
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class AppComponent {
  title = 'fmi';
}
