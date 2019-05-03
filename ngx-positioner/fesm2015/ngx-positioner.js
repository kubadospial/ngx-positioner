import { Subject, fromEvent, of } from 'rxjs';
import { takeUntil, debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Injectable, Directive, ElementRef, Input, Output, EventEmitter, Inject, NgModule } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPositionerService {
    constructor() {
        this.changeSettings$ = new Subject();
        this.initialSettings = {
            offset: {
                isScrolledToBottom: 0,
                isScrolledToTop: 0,
                moveToBottom: 0,
                moveToTop: 0,
            },
            delay: {
                isScrolledToBottom: 0,
                isScrolledToTop: 0,
                moveToBottom: 0,
                moveToTop: 0,
            },
            debounceTime: {
                isScrolledToBottom: 0,
                isScrolledToTop: 0,
                moveToBottom: 0,
                moveToTop: 0,
            },
            smoothScroll: {
                moveToBottom: true,
                moveToTop: true
            }
        };
    }
}
NgxPositionerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxPositionerService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPositionerDirective {
    /**
     * @param {?} el
     * @param {?} document
     * @param {?} positionerService
     */
    constructor(el, document, positionerService) {
        this.el = el;
        this.document = document;
        this.positionerService = positionerService;
        this.moveToTop$ = new Subject();
        this.moveToBottom$ = new Subject();
        this.isScrolledToTop = new EventEmitter();
        this.isScrolledToBottom = new EventEmitter();
        this._destroy$ = new Subject();
        this._stopAllSubscriptions$ = new Subject();
        this._scrollingEvent = new Subject();
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    set settings(settings) {
        this._mergeSetttings(settings);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isScrolledToTop.next(this._isScrolledToTopCondition);
        this.isScrolledToBottom.next(this._isScrolledToBottomCondition);
        this._initializeSubscriptions();
        this.positionerService.changeSettings$.pipe(takeUntil(this._destroy$)).subscribe((/**
         * @param {?} settings
         * @return {?}
         */
        (settings) => {
            this._stopAllSubscriptions$.next();
            this._mergeSetttings(settings);
            this._initializeSubscriptions();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        this._stopAllSubscriptions$.next();
        this._stopAllSubscriptions$.complete();
    }
    /**
     * @private
     * @return {?}
     */
    _initializeSubscriptions() {
        fromEvent(this._scrollableElement, 'scroll').pipe(takeUntil(this._stopAllSubscriptions$)).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._scrollingEvent.next()));
        // TOP
        this._scrollingEvent.pipe(debounceTime(this._settings.debounceTime.isScrolledToTop), delay(this._settings.delay.isScrolledToTop), switchMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => of(this._isScrolledToTopCondition))), takeUntil(this._stopAllSubscriptions$)).subscribe((/**
         * @param {?} isScrolledToTop
         * @return {?}
         */
        (isScrolledToTop) => this.isScrolledToTop.next(isScrolledToTop)));
        // BOTTOM
        this._scrollingEvent.pipe(debounceTime(this._settings.debounceTime.isScrolledToBottom), delay(this._settings.delay.isScrolledToBottom), switchMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => of(this._isScrolledToBottomCondition))), takeUntil(this._stopAllSubscriptions$)).subscribe((/**
         * @param {?} isScrolledToBottom
         * @return {?}
         */
        (isScrolledToBottom) => this.isScrolledToBottom.next(isScrolledToBottom)));
        this.moveToTop$.pipe(debounceTime(this._settings.debounceTime.moveToTop), delay(this._settings.delay.moveToTop), takeUntil(this._stopAllSubscriptions$)).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._onMoveToTop()));
        this.moveToBottom$.pipe(debounceTime(this._settings.debounceTime.moveToBottom), delay(this._settings.delay.moveToBottom), takeUntil(this._stopAllSubscriptions$), switchMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._onMoveToBottom()))).subscribe((/**
         * @param {?} height
         * @return {?}
         */
        height => this._scrollableElement.scroll({ behavior: this._moveToBottomBehavior, top: height + this._moveBottDiffOffset })));
    }
    /**
     * @private
     * @param {?} settings
     * @return {?}
     */
    _mergeSetttings(settings) {
        if (!!settings) {
            this._settings = Object.assign({}, settings, { offset: Object.assign({}, this.positionerService.initialSettings.offset, settings.offset), delay: Object.assign({}, this.positionerService.initialSettings.delay, settings.delay), debounceTime: Object.assign({}, this.positionerService.initialSettings.debounceTime, settings.debounceTime), smoothScroll: Object.assign({}, this.positionerService.initialSettings.smoothScroll, settings.smoothScroll) });
            this._setScrollableElement();
        }
        else {
            console.error(`%c Invalid settings object! `, 'color: #fff');
        }
    }
    /**
     * @private
     * @return {?}
     */
    _setScrollableElement() {
        this._scrollableElement = this.el.nativeElement;
        if (!!this._settings.scrollableElement) {
            /** @type {?} */
            const scrollEl = this.document.querySelector(this._settings.scrollableElement);
            if (!!scrollEl) {
                this._scrollableElement = scrollEl;
            }
            else {
                console.error(`%c Couldn't find ${this._settings.scrollableElement} in DOM! `, 'color: #fff');
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    _onMoveToTop() {
        this._scrollableElement.scroll({ behavior: this._moveToTopBehavior, top: this._moveToTopOffset });
    }
    /**
     * @private
     * @return {?}
     */
    _onMoveToBottom() {
        return of(this._moveToBottomOffset).pipe(tap((/**
         * @param {?} height
         * @return {?}
         */
        height => this._scrollableElement.scroll({ behavior: this._moveToBottomBehavior, top: height }))), delay(this._settings.smoothScroll.moveToBottom ? 600 : 0));
    }
    /**
     * @private
     * @return {?}
     */
    get _moveToTopBehavior() {
        return this._settings.smoothScroll.moveToTop ? 'smooth' : 'auto';
    }
    /**
     * @private
     * @return {?}
     */
    get _moveToBottomBehavior() {
        return this._settings.smoothScroll.moveToBottom ? 'smooth' : 'auto';
    }
    /**
     * @private
     * @return {?}
     */
    get _isScrolledToTopCondition() {
        return this._scrollableElement.scrollTop <= this._isScrolledToTopOffset;
    }
    /**
     * @private
     * @return {?}
     */
    get _isScrolledToBottomCondition() {
        return this._scrollableElement.scrollTop + this._scrollableElement.clientHeight >= this._isScrolledToBottomOffset;
    }
    /**
     * @private
     * @return {?}
     */
    get _isScrolledToTopOffset() {
        return this._settings.offset.isScrolledToTop;
    }
    /**
     * @private
     * @return {?}
     */
    get _isScrolledToBottomOffset() {
        return this._scrollableElement.scrollHeight - this._settings.offset.isScrolledToBottom;
    }
    /**
     * @private
     * @return {?}
     */
    get _moveToTopOffset() {
        return this._settings.offset.moveToTop;
    }
    /**
     * @private
     * @return {?}
     */
    get _moveToBottomOffset() {
        if (!this._settings.offset.moveToBottom) {
            return this._scrollableElement.scrollHeight;
        }
        else {
            return this._scrollableElement.offsetHeight - this._settings.offset.moveToBottom;
        }
    }
    /**
     * @private
     * @return {?}
     */
    get _moveBottDiffOffset() {
        /** @type {?} */
        let diff = this._scrollableElement.scrollTop - this._scrollableElement.offsetHeight;
        if (!!this._settings.offset.moveToBottom) {
            diff = (this._scrollableElement.scrollHeight - (this._scrollableElement.scrollTop + this._scrollableElement.offsetHeight)) - this._settings.offset.moveToBottom;
        }
        return diff;
    }
}
NgxPositionerDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxPositioner]' },] }
];
/** @nocollapse */
NgxPositionerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgxPositionerService }
];
NgxPositionerDirective.propDecorators = {
    settings: [{ type: Input, args: ['settings',] }],
    moveToTop$: [{ type: Input }],
    moveToBottom$: [{ type: Input }],
    isScrolledToTop: [{ type: Output }],
    isScrolledToBottom: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPositionerModule {
}
NgxPositionerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [NgxPositionerDirective],
                declarations: [NgxPositionerDirective],
                providers: [NgxPositionerService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxPositionerService, NgxPositionerDirective, NgxPositionerModule };

//# sourceMappingURL=ngx-positioner.js.map