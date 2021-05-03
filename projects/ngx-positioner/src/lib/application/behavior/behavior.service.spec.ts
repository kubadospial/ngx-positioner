import { fakeAsync, tick } from '@angular/core/testing';
import { ScrollBehavior } from '../../models/scroll-behavior.enum';
import { BehaviorService } from './behavior.service';
import {
  behaviorServiceStub,
  prepareBehaviorServiceStub,
} from './behavior.stub';

const compileService = () => new BehaviorService();

describe('BehaviorService', () => {
  let service: BehaviorService;

  beforeEach(() => {
    service = compileService();
    service.scrollableElement = behaviorServiceStub.scrollableElement;
  });
  afterEach(() => (service = undefined));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should scroll up', (done) => {
    service.scrollableElement = prepareBehaviorServiceStub(
      100
    ).scrollableElement;
    service.scroll(ScrollBehavior.smooth, 0, 10).then(() => {
      expect(service.scrollTop).toEqual(0);
      done();
    });
  });

  it('should scroll smoothly', (done) => {
    const scrollTopSpy = spyOnProperty(service, 'scrollTop', 'set');
    service.scroll(ScrollBehavior.smooth, 100, 10).then(() => {
      expect(scrollTopSpy).toHaveBeenCalledTimes(10);
      done();
    });
  });

  it('should change elements scrollTop', fakeAsync(() => {
    service.scroll(ScrollBehavior.smooth, 100, 10).then(() => {
      expect(service.scrollTop).toEqual(100);
    });
    tick();
    service.scroll(ScrollBehavior.auto, 200, 10).then(() => {
      expect(service.scrollTop).toEqual(200);
    });
  }));

  it('should scroll instantly', (done) => {
    const scrollTopSpy = spyOnProperty(service, 'scrollTop', 'set');
    service.scroll(ScrollBehavior.auto, 100, 10).then(() => {
      expect(scrollTopSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should adapt scroll speed medium', fakeAsync(() => {
    const firstNumberCalls = 5;
    const secondNumberCalls = 20;
    const scrollTopSpy = spyOnProperty(service, 'scrollTop', 'set');
    testSpeed(scrollTopSpy, firstNumberCalls, 20);
    testSpeed(scrollTopSpy, secondNumberCalls + firstNumberCalls, 5);
  }));

  const testSpeed = (spy, numberCalls: number, speed: number) => {
    service.scroll(ScrollBehavior.smooth, 100, speed).then(() => {
      expect(spy).toHaveBeenCalledTimes(numberCalls);
    });
    tick();
  };
});
