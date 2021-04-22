import { ScrollBehavior } from '../../models/scroll-behavior.enum';
import {
  behaviorServiceStub,
  prepareBehaviorServiceStub,
} from '../behavior/behavior.stub';
import { settingsServiceStub } from '../settings/settings.stub';
import { CalculationsService } from './calculations.service';

const compileService = (behavior = behaviorServiceStub) =>
  new CalculationsService(behavior as any, settingsServiceStub as any);

describe('CalculationsService', () => {
  let service: CalculationsService;

  afterEach(() => (service = undefined));

  it('should create', () => {
    service = compileService();
    expect(service).toBeTruthy();
  });

  it('should init', () => {
    service = compileService();

    const {
      isScrolledToTopCondition,
      isScrolledToBottomCondition,
      moveToTopBehavior,
      moveToBottomBehavior,
      moveToTopOffset,
      moveToBottomOffset,
      moveToTopSpeed,
      moveToBottomSpeed,
    } = service;
    expect(isScrolledToTopCondition).toBeTrue();
    expect(isScrolledToBottomCondition).toBeFalse();
    expect(moveToTopBehavior).toEqual(ScrollBehavior.smooth);
    expect(moveToBottomBehavior).toEqual(ScrollBehavior.smooth);
    expect(moveToTopOffset).toEqual(0);
    expect(moveToBottomOffset).toEqual(15455);
    expect(moveToTopSpeed).toEqual(10);
    expect(moveToBottomSpeed).toEqual(10);
  });

  it('should change isScrolledToTopCondition to false when scrolled down to the page and isScrolledToBottomCondition to true', () => {
    service = compileService(prepareBehaviorServiceStub(15455));
    const { isScrolledToTopCondition, isScrolledToBottomCondition } = service;
    expect(isScrolledToTopCondition).toBeFalse();
    expect(isScrolledToBottomCondition).toBeTrue();
  });

  it('should have false for isScrolledToTopCondition and isScrolledToBottomCondition', () => {
    service = compileService(prepareBehaviorServiceStub(1055));
    const { isScrolledToTopCondition, isScrolledToBottomCondition } = service;
    expect(isScrolledToTopCondition).toBeFalse();
    expect(isScrolledToBottomCondition).toBeFalse();
  });
});
