import { Directive, ElementRef, OnInit, Input, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, of } from 'rxjs';
import { takeUntil, debounceTime, delay, switchMap } from 'rxjs/operators';

import { Settings } from './models';
import { NgxPositionerService } from './ngx-positioner.service';

@Directive({ selector: '[ngxPositioner]' })
export class NgxPositionerDirective implements OnInit, OnDestroy {
    @Input('settings')
    set settings(settings: Settings) {
        this._mergeSetttings(settings);
    }
    @Input() moveToTop$ = new Subject<void>();
    @Input() moveToBottom$ = new Subject<void>();
    @Output() isScrolledToTop = new EventEmitter<boolean>();
    @Output() isScrolledToBottom = new EventEmitter<boolean>();

    private _parentElement: HTMLElement;
    private _relativeToElement: HTMLElement;
    private _destroy$ = new Subject<void>();
    private _stopAllSubscriptions$ = new Subject<void>();
    private _scrollingEvent = new Subject<void>();
    private _settings: Settings;

    constructor(
        private el: ElementRef,
        @Inject(DOCUMENT) private document,
        private positionerService: NgxPositionerService
    ) { }

    ngOnInit() {
        this.isScrolledToTop.next(this._isScrolledToTopCondition);
        this.isScrolledToBottom.next(this._isScrolledToBottomCondition);

        this._initializeSubscriptions();

        this.positionerService.changeSettings$.pipe(
            takeUntil(this._destroy$)
        ).subscribe((settings: Settings) => {
            this._stopAllSubscriptions$.next();
            this._mergeSetttings(settings);
            this._initializeSubscriptions();
        });
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        this._stopAllSubscriptions$.next();
        this._stopAllSubscriptions$.complete();
    }

    private _initializeSubscriptions() {
        fromEvent(this._parentElement, 'scroll').pipe(
            takeUntil(this._destroy$),
        ).subscribe(_ => this._scrollingEvent.next());

        // TOP
        this._scrollingEvent.pipe(
            debounceTime(this._settings.debounceTime.isScrolledToTop),
            delay(this._settings.delay.isScrolledToTop),
            switchMap(_ => of(this._isScrolledToTopCondition)),
            takeUntil(this._stopAllSubscriptions$),
        ).subscribe((isScrolledToTop: boolean) => this.isScrolledToTop.next(isScrolledToTop));

        // BOTTOM
        this._scrollingEvent.pipe(
            debounceTime(this._settings.debounceTime.isScrolledToBottom),
            delay(this._settings.delay.isScrolledToBottom),
            switchMap(_ => of(this._isScrolledToBottomCondition)),
            takeUntil(this._stopAllSubscriptions$),
        ).subscribe((isScrolledToBottom: boolean) => this.isScrolledToBottom.next(isScrolledToBottom));

        this.moveToTop$.pipe(
            debounceTime(this._settings.debounceTime.moveToTop),
            delay(this._settings.delay.moveToTop),
            takeUntil(this._stopAllSubscriptions$)
        ).subscribe(_ => this._onMoveToTop());

        this.moveToBottom$.pipe(
            debounceTime(this._settings.debounceTime.moveToBottom),
            delay(this._settings.delay.moveToBottom),
            takeUntil(this._stopAllSubscriptions$)
        ).subscribe(_ => this._onMoveToBottom());
    }

    private _mergeSetttings(settings: Settings) {
        if (!!settings) {
            this._settings = {
                ...settings,
                offset: {
                    ...this.positionerService.initialSettings.offset,
                    ...settings.offset
                },
                delay: {
                    ...this.positionerService.initialSettings.delay,
                    ...settings.delay
                },
                debounceTime: {
                    ...this.positionerService.initialSettings.debounceTime,
                    ...settings.debounceTime,
                },
                smoothScroll: {
                    ...this.positionerService.initialSettings.smoothScroll,
                    ...settings.smoothScroll,
                }
            };
            this._setRelativeElement();
            this._setScrollToElement();
        } else {
            console.error(`%c Invalid settings object! `, 'color: #fff');
        }
    }

    private _setRelativeElement() {
        if (!!this._settings.childElement) {
            const relEl: HTMLElement = this.document.querySelector(this._settings.childElement);
            if (!!relEl) {
                this._relativeToElement = relEl;
            } else {
                console.error(`%c ERROR: Cannot find element ${this._settings.childElement} in DOM `, 'color: #fff');
            }
        } else {
            console.error(`%c relativeElement is required! `, 'color: #fff');
        }
    }

    private _setScrollToElement() {
        this._parentElement = this.el.nativeElement;
        if (!!this._settings.parentElement) {
            const scrollEl: HTMLElement = this.document.querySelector(this._settings.parentElement);
            if (!!scrollEl) {
                this._parentElement = scrollEl;
            }
        }
    }

    private _onMoveToTop() {
        this._parentElement.scrollTo({ behavior: this._moveToTopBehavior, top: this._moveToTopOffset });
    }

    private _onMoveToBottom() {
        this._parentElement.scrollTo({ behavior: this._moveToBottomBehavior, top: this._moveToBottomOffset });
    }

    private get _moveToTopBehavior(): ScrollBehavior {
        return this._settings.smoothScroll.moveToTop ? 'smooth' : 'auto';
    }

    private get _moveToBottomBehavior(): ScrollBehavior {
        return this._settings.smoothScroll.moveToBottom ? 'smooth' : 'auto';
    }

    private get _isScrolledToTopCondition(): boolean {
        return this._parentElement.scrollTop <= this._isScrolledToTopOffset;
    }

    private get _isScrolledToBottomCondition(): boolean {
        console.log(this._parentElement.scrollTop + this._parentElement.clientHeight);
        return this._parentElement.scrollTop + this._parentElement.clientHeight >= this._isScrolledToBottomOffset;
    }

    private get _isScrolledToTopOffset() {
        return this._settings.offset.isScrolledToTop;
    }

    private get _isScrolledToBottomOffset(): number {
        return this._parentElement.scrollHeight - this._settings.offset.isScrolledToBottom;
    }

    private get _moveToTopOffset(): number {
        return this._settings.offset.moveToTop;
    }

    private get _moveToBottomOffset(): number {
        let offsetElem = this._relativeToElement.clientHeight;
        if (this._settings.offset.moveToBottom) {
            offsetElem = this._parentElement.clientHeight + 38;
        }
        return offsetElem - this._settings.offset.moveToBottom;
    }
}
