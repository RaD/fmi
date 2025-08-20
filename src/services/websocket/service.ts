import { inject, Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subscription, timer } from 'rxjs';
import { filter, retry, take, timeout } from 'rxjs/operators';
import { BaseFieldsT, UploadResponseT } from './interface';
import { AppComponent } from '../../app/component';
import { ScreamService } from '../scream/service';
import { OnYamlProcessedEvent } from '../scream/messages';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private postboy = inject(ScreamService);
  private socket$?: WebSocketSubject<any>;
  private messages$!: Observable<any>;

  // Задержка перед повторным подключением (в миллисекундах)
  private reconnectInterval = 1000;
  private subscription?: Subscription;
  private cliendId?: string;

  private get me(): string {
    return this.constructor.name;
  }

  init(getApp: () => AppComponent) {}

  // Подключаемся к WebSocket-серверу по указанному URL
  public connect(): void {
    // уникальный идентификатор клиента
    if (!this.socket$ || this.socket$.closed) {
      const url = `ws://localhost:8000/ws?cid=${this.cliendId}`;
      this.socket$ = webSocket({
        url: url,
        openObserver: {
          next: () => {
            console.info(`<${this.me}> Connection is established`);
            console.debug(`<${this.me}> Connect using "${url}"`)
          }
        },
        closeObserver: {
          next: (event) => {
            console.warn(`<${this.me}> Connection is closed, code ${event.code}. Trying to reconnect...`);
            // Отписываемся от старой подписки, если она есть
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
            // Сбрасываем сокет, чтобы условие в connect() сработало при следующем вызове
            this.socket$ = undefined;
            // Попытка переподключения через заданное время
            setTimeout(() => { this.connect(); }, this.reconnectInterval);
          }
        }
      });

      // Сохраняем Observable для дальнейшей работы
      this.messages$ = this.socket$.asObservable();

      // Подписываемся на сообщения и ошибки
      this.subscription = this.socket$.pipe(
        retry({
          delay: (error, retryCount) => {
            console.error(`<${this.me}> Reconnect try counter:`, retryCount);
            return timer(this.reconnectInterval);
          }
        })
      ).subscribe({
        next: msg => this.dispatcher(msg),
        error: err => this.subscribeErrorHandler(err),
        complete: () => console.info(`<${this.me}> Connection closed successfully`)
      });
    }
  }

  private subscribeErrorHandler(err: Error): void {
    console.info(`<${this.me}> Error: ${err}`);
    // В случае ошибки сбрасываем сокет и пробуем переподключиться
    this.socket$ = undefined;
    setTimeout(() => { this.connect(); }, this.reconnectInterval);
  }

  // Отправка сообщения на сервер
  public sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  public onMessageForTask(taskId: string) {
    return this.messages$.pipe(
      filter(msg => msg.taskId === taskId),
      take(1),
      timeout(10000) // можно добавить
    );
  }

  // Получение потока сообщений с сервера
  public getMessages(): Observable<any> {
    return this.socket$!.asObservable();
  }

  // Закрытие соединения
  public close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }

  private dispatcher(msg: any): void {
    console.debug(`<${this.me}> Got message:`, msg);
    const base = msg as BaseFieldsT;
    const taskId = base.taskId;
    switch(base.kind) {
      case 'yaml':
        break;
      default:
        console.error(`<${this.me}> Unknown message kind: ${base.kind}`);
    }
  }
}
