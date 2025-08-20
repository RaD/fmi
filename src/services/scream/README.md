# Postboy

https://postboy.artstesh.ru

Пример использования: https://habr.com/ru/articles/881716/

Библиотека @artstesh/postboy создана, чтобы:

1. Снизить связанность кода — больше никаких прямых связей компонентов через
   Input/Output или событийные Subjects.
2. Упростить архитектуру — теперь каждый компонент может "общаться" с другими
   через глобальный механизм событий, не зная детали их реализации.
3. Минимизировать зависимости — лёгкий инструмент, который не требует громоздких
   библиотек или решений.

Библиотека @artstesh/postboy реализует гибкий и понятный интерфейс для обмена
событиями. Вам достаточно "подписаться" на нужное событие и "отправить" его,
когда это потребуется. Компоненты не знают друг о друге, но взаимодействуют
абсолютно прозрачно.

## Пример использования

Отправка:

```typescript
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sender',
  template: `<button (click)="sendEvent()">Отправить</button>`,
})
export class SenderComponent {
  constructor(private postboy: AppPostboyService) {}

  sendEvent() {
    this.postboy.fire(new ButtonClickEvent('Событие от отправителя!'));
  }
}
```

Приём:

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-receiver',
  template: `<p>{{ message }}</p>`,,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiverComponent implements OnInit {
  message = '';
  constructor(private postboy: AppPostboyService,
              private detector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.postboy.sub(ButtonClickEvent).subscribe(ev => {
      this.message = ev.text;
      this.detector.detectChanges();
    });
  }
}
```
