import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, delay, map, takeUntil } from 'rxjs/operators';
import { Settings } from '../models';
import { ScrollBehavior } from '../models/scroll-behavior.enum';
import { BehaviorService } from './behavior/behavior.service';
import { CalculationsService } from './calculations/calculations.service';
import { SettingsService } from './settings/settings.service';

@Injectable()
export class MoveService implements OnDestroy {
  private _scrollingEvent = new Subject<void>();
  private _isScrolledToBottom$ = new Subject<boolean>();
  private _isScrolledToTop$ = new Subject<boolean>();
  private _moveEnded$ = new Subject<boolean>();
  private _destroy$ = new Subject<void>();

  isScrolledToBottom$ = this._isScrolledToBottom$.asObservable();
  isScrolledToTop$ = this._isScrolledToTop$.asObservable();
  moveEnded$ = this._moveEnded$.asObservable();

  private get _settings(): Settings {
    return this._settingService.settings;
  }

  constructor(
    private _behaviorService: BehaviorService,
    private _settingService: SettingsService,
    private _calculationsService: CalculationsService
  ) {}

  initializeSubscriptions(
    moveToTop$: Observable<any>,
    moveToBottom$: Observable<any>
  ) {
    this._isScrolledTopSub();
    this._isScrolledBottomSub();

    fromEvent(this._behaviorService.scrollableElement, 'scroll')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this._scrollingEvent.next());

    this._moveToTop(moveToTop$);
    this._moveToBottom(moveToBottom$);
  }

  private _moveToBottom(moveToBottom$: Observable<any>) {
    moveToBottom$
      .pipe(
        debounceTime(this._settings.debounceTime.moveToBottom),
        delay(this._settings.delay.moveToBottom),
        takeUntil(this._destroy$)
      )
      .subscribe(() =>
        this._onMove(
          this._calculationsService.moveToBottomBehavior,
          this._calculationsService.moveToBottomOffset,
          this._calculationsService.moveToBottomSpeed
        )
      );
  }

  private _moveToTop(moveToTop$: Observable<any>) {
    moveToTop$
      .pipe(
        debounceTime(this._settings.debounceTime.moveToTop),
        delay(this._settings.delay.moveToTop),
        takeUntil(this._destroy$)
      )
      .subscribe(() =>
        this._onMove(
          this._calculationsService.moveToTopBehavior,
          this._calculationsService.moveToTopOffset,
          this._calculationsService.moveToTopSpeed
        )
      );
  }

  private _isScrolledBottomSub() {
    this._scrollingEvent
      .pipe(
        debounceTime(this._settings.debounceTime.isScrolledToBottom),
        delay(this._settings.delay.isScrolledToBottom),
        map(() => this._calculationsService.isScrolledToBottomCondition),
        takeUntil(this._destroy$)
      )
      .subscribe((isScrolledToBottom: boolean) =>
        this._isScrolledToBottom$.next(isScrolledToBottom)
      );
  }

  private _isScrolledTopSub() {
    this._scrollingEvent
      .pipe(
        debounceTime(this._settings.debounceTime.isScrolledToTop),
        delay(this._settings.delay.isScrolledToTop),
        map(() => this._calculationsService.isScrolledToTopCondition),
        takeUntil(this._destroy$)
      )
      .subscribe((isScrolledToTop: boolean) => {
        this._isScrolledToTop$.next(isScrolledToTop);
      });
  }

  private _onMove(moveBehavior: ScrollBehavior, offset: number, speed: number) {
    this._behaviorService.scroll(moveBehavior, offset, speed).then(() => {
      if (moveBehavior === ScrollBehavior.SMOOTH) {
        this._moveEnded$.next();
      }
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
