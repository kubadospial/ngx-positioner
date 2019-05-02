import { Directive, ElementRef, OnInit, Input, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, of, Observable } from 'rxjs';
import { takeUntil, debounceTime, delay, switchMap, tap } from 'rxjs/operators';

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

    private _scrollableElement: HTMLElement;
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
        fromEvent(this._scrollableElement, 'scroll').pipe(
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
            takeUntil(this._stopAllSubscriptions$),
            switchMap(_ => this._onMoveToBottom())
        ).subscribe(height => this._scrollableElement.scroll({ behavior: this._moveToBottomBehavior, top: height + this._moveBottDiffOffset }))
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
            this._setScrollableElement();
        } else {
            console.error(`%c Invalid settings object! `, 'color: #fff');
        }
    }

    private _setScrollableElement() {
        this._scrollableElement = this.el.nativeElement;
        if (!!this._settings.scrollableElement) {
            const scrollEl: HTMLElement = this.document.querySelector(this._settings.scrollableElement);
            if (!!scrollEl) {
                this._scrollableElement = scrollEl;
            } else {
                console.error(`%c Couldn't find ${ this._settings.scrollableElement } in DOM! `, 'color: #fff');
            }
        }
    }

    private _onMoveToTop() {
        this._scrollableElement.scroll({ behavior: this._moveToTopBehavior, top: this._moveToTopOffset });
    }

    private _onMoveToBottom(): Observable<number> {
        return of(this._moveToBottomOffset).pipe(
            tap(height => this._scrollableElement.scroll({ behavior: this._moveToBottomBehavior, top: height })),
            delay(this._settings.smoothScroll.moveToBottom ? 600 : 0)
        )
    }

    private get _moveToTopBehavior(): ScrollBehavior {
        return this._settings.smoothScroll.moveToTop ? 'smooth' : 'auto';
    }

    private get _moveToBottomBehavior(): ScrollBehavior {
        return this._settings.smoothScroll.moveToBottom ? 'smooth' : 'auto';
    }

    private get _isScrolledToTopCondition(): boolean {
        return this._scrollableElement.scrollTop <= this._isScrolledToTopOffset;
    }

    private get _isScrolledToBottomCondition(): boolean {
        return this._scrollableElement.scrollTop + this._scrollableElement.clientHeight >= this._isScrolledToBottomOffset;
    }

    private get _isScrolledToTopOffset() {
        return this._settings.offset.isScrolledToTop;
    }

    private get _isScrolledToBottomOffset(): number {
        return this._scrollableElement.scrollHeight - this._settings.offset.isScrolledToBottom;
    }

    private get _moveToTopOffset(): number {
        return this._settings.offset.moveToTop;
    }

    private get _moveToBottomOffset(): number {
        if (!this._settings.offset.moveToBottom) {
            return this._scrollableElement.scrollHeight;
        } else {
            return this._scrollableElement.offsetHeight - this._settings.offset.moveToBottom;
        }
    }

    private get _moveBottDiffOffset() {
        let diff = this._scrollableElement.scrollTop - this._scrollableElement.offsetHeight;
        if (!!this._settings.offset.moveToBottom) {
            diff = (this._scrollableElement.scrollHeight - (this._scrollableElement.scrollTop + this._scrollableElement.offsetHeight)) - this._settings.offset.moveToBottom;
        }
        return diff;
    }
}
