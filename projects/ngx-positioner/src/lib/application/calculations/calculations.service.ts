import { Injectable } from '@angular/core';
import { Settings } from '../../models';
import { ScrollBehavior } from '../../models/scroll-behavior.enum';
import { BehaviorService } from '../behavior/behavior.service';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class CalculationsService {
  private get _settings(): Settings {
    return this._settingService.settings;
  }

  constructor(
    private _behaviorService: BehaviorService,
    private _settingService: SettingsService
  ) {}

  get isScrolledToTopCondition(): boolean {
    return this._behaviorService.scrollTop <= this.scrolledToTopOffset;
  }

  get isScrolledToBottomCondition(): boolean {
    const top =
      this._behaviorService.scrollTop +
      this._behaviorService.scrollableElement.clientHeight;
    return top >= this.scrolledToBottomOffset;
  }

  get scrolledToTopOffset(): number {
    return this._settings.offset.isScrolledToTop;
  }

  get scrolledToBottomOffset(): number {
    return (
      this._behaviorService.scrollableElement.scrollHeight -
      this._settings.offset.isScrolledToBottom
    );
  }

  get moveToTopSpeed(): number {
    return this._settings.smoothScroll.moveToTopSpeed;
  }

  get moveToBottomSpeed(): number {
    return this._settings.smoothScroll.moveToBottomSpeed;
  }

  get moveToTopBehavior(): ScrollBehavior {
    return this._settings.smoothScroll.moveToTop
      ? ScrollBehavior.SMOOTH
      : ScrollBehavior.AUTO;
  }

  get moveToBottomBehavior(): ScrollBehavior {
    return this._settings.smoothScroll.moveToBottom
      ? ScrollBehavior.SMOOTH
      : ScrollBehavior.AUTO;
  }

  get moveToTopOffset(): number {
    return this._settings.offset.moveToTop;
  }

  get moveToBottomOffset(): number {
    return (
      this._behaviorService.scrollableElement.scrollHeight -
      this._behaviorService.scrollableElement.offsetHeight -
      this._settings.offset.moveToBottom
    );
  }
}
