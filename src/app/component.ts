import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class AppComponent {
  title = 'fmi';
}
