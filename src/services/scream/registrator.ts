import { Injectable } from '@angular/core';
import { PostboyAbstractRegistrator } from '@artstesh/postboy';
import { ScreamService } from './service';
import { OnYamlProcessedEvent } from './messages';

@Injectable()
export class MessageRegistrator extends PostboyAbstractRegistrator {

  constructor(postboy: ScreamService) {
    super(postboy);
  }

  protected _up(): void {
    this.postboy.recordSubject(OnYamlProcessedEvent);
  }
}