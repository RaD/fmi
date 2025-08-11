import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { urls, enableYamlConsole } from '../../app/interface';

@Component({
  selector: 'app-welcome',
  imports: [
    RouterModule,
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class WelcomePage {
  urls = urls;
  enableYamlConsole = enableYamlConsole;
}
