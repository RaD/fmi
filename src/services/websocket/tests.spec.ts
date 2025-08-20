import { TestBed } from '@angular/core/testing';
import { WebsocketService } from './service';
import { OrderItem } from '../datasource/interface';
import { StorageService } from '../storage/service';
import { of } from 'rxjs';

describe('WebsocketService', () => {
  let service: WebsocketService;
  let storageServiceStub: Partial<StorageService>;
  let fakeSocket: any;

  beforeEach(() => {
    // Create a fake WebSocketSubject object with spy-able methods.
    fakeSocket = {
      next: jasmine.createSpy('next'),
      complete: jasmine.createSpy('complete'),
      closed: false,
      asObservable: () => of({}) // returns an observable that emits an empty object
    };

    // Create a stub for StorageService with just the methods needed.
    storageServiceStub = {
      // registerTask should return a task id.
      registerTask: jasmine.createSpy('registerTask').and.returnValue('task123'),
      getOrderItem: jasmine.createSpy('getOrderItem').and.callFake((hash: string): OrderItem | null => {
        // Return a fake OrderItem (adjust properties as needed)
        return {
          hash: hash,
          quantity: 1,
          color: 'white',
          fillDensity: 35,
          wallThickness: 1000,
          x: 0,
          y: 0,
          z: 0,
          render: '/assets/img/render.jpg',
          stlcost: null,
          // For testing, we assume a property renderExpired exists
          renderExpired: Math.floor(Date.now() / 1000) + 1000
        } as OrderItem;
      })
    };

    TestBed.configureTestingModule({
      providers: [
        WebsocketService,
        { provide: StorageService, useValue: storageServiceStub }
      ]
    });
    service = TestBed.inject(WebsocketService);

    // Simulate an app component with a storageService property.
    const fakeApp = { storageService: storageServiceStub } as any;
    service.init(() => fakeApp);
  });

  afterEach(() => {
    // Clean up localStorage if necessary.
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sendMessage should call next on socket$', () => {
    // Set fakeSocket into the service
    service['socket$'] = fakeSocket;
    const message = { test: 'hello' };
    service.sendMessage(message);
    expect(fakeSocket.next).toHaveBeenCalledWith(message);
  });

  it('close should call complete on socket$', () => {
    service['socket$'] = fakeSocket;
    service.close();
    expect(fakeSocket.complete).toHaveBeenCalled();
  });

  it('uploadFile should call sendMessage with an UploadRequest containing dummy hash', (done) => {
    // Stub calculateSHA256 to resolve with a dummy hash.
    spyOn(service, 'calculateSHA256').and.returnValue(Promise.resolve('dummyhash'));

    // Spy on sendMessage so we can inspect what argument is passed.
    const sendMessageSpy = spyOn(service, 'sendMessage');

    // Create a dummy ArrayBuffer to simulate file content.
    const fileContent = new Uint8Array([1, 2, 3, 4]).buffer;
    // Create a dummy file with .stl extension
    const dummyFile = new File([fileContent], 'test.stl', { type: 'model/stl' });

    // Override FileReader to simulate reading the file as ArrayBuffer.
    const originalFileReader = window.FileReader;
    class FakeFileReader {
      public result: any;
      public onload: (() => void) | null = null;
      public onerror: (() => void) | null = null;
      readAsArrayBuffer(file: File): void {
        // Immediately call onload with our dummy content.
        this.result = fileContent;
        if (this.onload) {
          this.onload();
        }
      }
    }
    (window as any).FileReader = FakeFileReader;

    service.uploadFile(dummyFile);

    // Wait a tick for async operations.
    setTimeout(() => {
      expect(service.sendMessage).toHaveBeenCalled();
      const sentMessage = (sendMessageSpy as jasmine.Spy).calls.mostRecent().args[0];
      expect(sentMessage).toBeDefined();
      // Check that the UploadRequest has expected fields:
      expect(sentMessage.kind).toEqual('stl');
      expect(sentMessage.action).toEqual('upload');
      expect(sentMessage.hash).toEqual('dummyhash');
      // Restore the original FileReader
      window.FileReader = originalFileReader;
      done();
    }, 10);
  });
});
