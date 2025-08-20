import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { urls } from '../../app/interface';

@Component({
  selector: 'app-not-working',
  imports: [RouterModule],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class NotWorkingPage {
  urls = urls;
}