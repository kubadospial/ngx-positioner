import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Inject,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Settings } from './models';
import {
  BehaviorService,
  MoveService,
  SettingsService,
  CalculationsService,
} from './application';

@Directive({
  selector: '[ngxPositioner]',
  providers: [
    SettingsService,
    BehaviorService,
    MoveService,
    CalculationsService,
  ],
})
export class NgxPositionerDirective implements AfterContentInit, OnDestroy {
  @Input() set settings(settings: Settings) {
    this._settingService.settings = settings;
  }
  @Input() set scrollableElement(selector: string) {
    this._setScrollableElement(selector);
  }
  @Input() moveToTop$ = new Subject<void>();
  @Input() moveToBottom$ = new Subject<void>();
  @Output() isScrolledToTop = new EventEmitter<boolean>();
  @Output() isScrolledToBottom = new EventEmitter<boolean>();

  private _isScrolledToBottom: boolean;
  private _isScrolledToTop: boolean;

  private _destroy$ = new Subject<void>();

  constructor(
    private _settingService: SettingsService,
    private _behaviorService: BehaviorService,
    private _moveService: MoveService,
    private _calculationsService: CalculationsService,
    private _el: ElementRef,
    private _cd: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this._moveService.isScrolledToTop$
      .pipe(takeUntil(this._destroy$))
      .subscribe((isScrolled: boolean) =>
        this._isScrolledToTopChanged(isScrolled)
      );

    this._moveService.isScrolledToBottom$
      .pipe(takeUntil(this._destroy$))
      .subscribe((isScrolled: boolean) =>
        this._isScrolledToBottomChanged(isScrolled)
      );

    this._moveService.moveEnded$
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._cd.detectChanges();
      });
  }

  ngAfterContentInit() {
    if (!this._behaviorService.scrollableElement) {
      this._setScrollableElement(undefined);
    }
    this._moveService.initializeSubscriptions(
      this.moveToTop$,
      this.moveToBottom$
    );
    const isScrolledToTop = this._calculationsService.isScrolledToTopCondition;
    const isScrolledToBottom = this._calculationsService
      .isScrolledToBottomCondition;
    this._isScrolledToTopChanged(isScrolledToTop);
    this._isScrolledToBottomChanged(isScrolledToBottom);
  }

  private _isScrolledToTopChanged(isScrolled: boolean) {
    this.isScrolledToTop.next(isScrolled);
    if (this._isScrolledToTop !== isScrolled) {
      this._cd.detectChanges();
      this._isScrolledToTop = isScrolled;
    }
  }

  private _isScrolledToBottomChanged(isScrolled: boolean) {
    this.isScrolledToBottom.next(isScrolled);
    if (this._isScrolledToBottom !== isScrolled) {
      this._cd.detectChanges();
      this._isScrolledToBottom = isScrolled;
    }
  }

  private _setScrollableElement(selector: string) {
    this._behaviorService.scrollableElement = this._el.nativeElement;
    if (!!selector) {
      const scrollEl: HTMLElement = this._document.querySelector(selector);
      if (!!scrollEl) {
        this._behaviorService.scrollableElement = scrollEl;
      } else {
        console.error(`%c Couldn't find ${selector} in DOM! `, 'color: #fff');
      }
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
