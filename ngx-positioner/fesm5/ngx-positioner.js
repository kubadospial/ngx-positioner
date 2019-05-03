import { __assign } from 'tslib';
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
var NgxPositionerService = /** @class */ (function () {
    function NgxPositionerService() {
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
    NgxPositionerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgxPositionerService.ctorParameters = function () { return []; };
    return NgxPositionerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxPositionerDirective = /** @class */ (function () {
    function NgxPositionerDirective(el, document, positionerService) {
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
    Object.defineProperty(NgxPositionerDirective.prototype, "settings", {
        set: /**
         * @param {?} settings
         * @return {?}
         */
        function (settings) {
            this._mergeSetttings(settings);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxPositionerDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isScrolledToTop.next(this._isScrolledToTopCondition);
        this.isScrolledToBottom.next(this._isScrolledToBottomCondition);
        this._initializeSubscriptions();
        this.positionerService.changeSettings$.pipe(takeUntil(this._destroy$)).subscribe((/**
         * @param {?} settings
         * @return {?}
         */
        function (settings) {
            _this._stopAllSubscriptions$.next();
            _this._mergeSetttings(settings);
            _this._initializeSubscriptions();
        }));
    };
    /**
     * @return {?}
     */
    NgxPositionerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroy$.next();
        this._destroy$.complete();
        this._stopAllSubscriptions$.next();
        this._stopAllSubscriptions$.complete();
    };
    /**
     * @private
     * @return {?}
     */
    NgxPositionerDirective.prototype._initializeSubscriptions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        fromEvent(this._scrollableElement, 'scroll').pipe(takeUntil(this._stopAllSubscriptions$)).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return _this._scrollingEvent.next(); }));
        // TOP
        this._scrollingEvent.pipe(debounceTime(this._settings.debounceTime.isScrolledToTop), delay(this._settings.delay.isScrolledToTop), switchMap((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return of(_this._isScrolledToTopCondition); })), takeUntil(this._stopAllSubscriptions$)).subscribe((/**
         * @param {?} isScrolledToTop
         * @return {?}
         */
        function (isScrolledToTop) { return _this.isScrolledToTop.next(isScrolledToTop); }));
        // BOTTOM
        this._scrollingEvent.pipe(debounceTime(this._settings.debounceTime.isScrolledToBottom), delay(this._settings.delay.isScrolledToBottom), switchMap((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return of(_this._isScrolledToBottomCondition); })), takeUntil(this._stopAllSubscriptions$)).subscribe((/**
         * @param {?} isScrolledToBottom
         * @return {?}
         */
        function (isScrolledToBottom) { return _this.isScrolledToBottom.next(isScrolledToBottom); }));
        this.moveToTop$.pipe(debounceTime(this._settings.debounceTime.moveToTop), delay(this._settings.delay.moveToTop), takeUntil(this._stopAllSubscriptions$)).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return _this._onMoveToTop(); }));
        this.moveToBottom$.pipe(debounceTime(this._settings.debounceTime.moveToBottom), delay(this._settings.delay.moveToBottom), takeUntil(this._stopAllSubscriptions$), switchMap((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return _this._onMoveToBottom(); }))).subscribe((/**
         * @param {?} height
         * @return {?}
         */
        function (height) { return _this._scrollableElement.scroll({ behavior: _this._moveToBottomBehavior, top: height + _this._moveBottDiffOffset }); }));
    };
    /**
     * @private
     * @param {?} settings
     * @return {?}
     */
    NgxPositionerDirective.prototype._mergeSetttings = /**
     * @private
     * @param {?} settings
     * @return {?}
     */
    function (settings) {
        if (!!settings) {
            this._settings = __assign({}, settings, { offset: __assign({}, this.positionerService.initialSettings.offset, settings.offset), delay: __assign({}, this.positionerService.initialSettings.delay, settings.delay), debounceTime: __assign({}, this.positionerService.initialSettings.debounceTime, settings.debounceTime), smoothScroll: __assign({}, this.positionerService.initialSettings.smoothScroll, settings.smoothScroll) });
            this._setScrollableElement();
        }
        else {
            console.error("%c Invalid settings object! ", 'color: #fff');
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxPositionerDirective.prototype._setScrollableElement = /**
     * @private
     * @return {?}
     */
    function () {
        this._scrollableElement = this.el.nativeElement;
        if (!!this._settings.scrollableElement) {
            /** @type {?} */
            var scrollEl = this.document.querySelector(this._settings.scrollableElement);
            if (!!scrollEl) {
                this._scrollableElement = scrollEl;
            }
            else {
                console.error("%c Couldn't find " + this._settings.scrollableElement + " in DOM! ", 'color: #fff');
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxPositionerDirective.prototype._onMoveToTop = /**
     * @private
     * @return {?}
     */
    function () {
        this._scrollableElement.scroll({ behavior: this._moveToTopBehavior, top: this._moveToTopOffset });
    };
    /**
     * @private
     * @return {?}
     */
    NgxPositionerDirective.prototype._onMoveToBottom = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return of(this._moveToBottomOffset).pipe(tap((/**
         * @param {?} height
         * @return {?}
         */
        function (height) { return _this._scrollableElement.scroll({ behavior: _this._moveToBottomBehavior, top: height }); })), delay(this._settings.smoothScroll.moveToBottom ? 600 : 0));
    };
    Object.defineProperty(NgxPositionerDirective.prototype, "_moveToTopBehavior", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._settings.smoothScroll.moveToTop ? 'smooth' : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPositionerDirective.prototype, "_moveToBottomBehavior", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._settings.smoothScroll.moveToBottom ? 'smooth' : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPositionerDirective.prototype, "_isScrolledToTopCondition", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._scrollableElement.scrollTop <= this._isScrolledToTopOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPositionerDirective.prototype, "_isScrolledToBottomCondition", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._scrollableElement.scrollTop + this._scrollableElement.clientHeight >= this._isScrolledToBottomOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPositionerDirective.prototype, "_isScrolledToTopOffset", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._settings.offset.isScrolledToTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPositionerDirective.prototype, "_isScrolledToBottomOffset", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._scrollableElement.scrollHeight - this._settings.offset.isScrolledToBottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPositionerDirective.prototype, "_moveToTopOffset", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._settings.offset.moveToTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPositionerDirective.prototype, "_moveToBottomOffset", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (!this._settings.offset.moveToBottom) {
                return this._scrollableElement.scrollHeight;
            }
            else {
                return this._scrollableElement.offsetHeight - this._settings.offset.moveToBottom;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPositionerDirective.prototype, "_moveBottDiffOffset", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var diff = this._scrollableElement.scrollTop - this._scrollableElement.offsetHeight;
            if (!!this._settings.offset.moveToBottom) {
                diff = (this._scrollableElement.scrollHeight - (this._scrollableElement.scrollTop + this._scrollableElement.offsetHeight)) - this._settings.offset.moveToBottom;
            }
            return diff;
        },
        enumerable: true,
        configurable: true
    });
    NgxPositionerDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngxPositioner]' },] }
    ];
    /** @nocollapse */
    NgxPositionerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgxPositionerService }
    ]; };
    NgxPositionerDirective.propDecorators = {
        settings: [{ type: Input, args: ['settings',] }],
        moveToTop$: [{ type: Input }],
        moveToBottom$: [{ type: Input }],
        isScrolledToTop: [{ type: Output }],
        isScrolledToBottom: [{ type: Output }]
    };
    return NgxPositionerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxPositionerModule = /** @class */ (function () {
    function NgxPositionerModule() {
    }
    NgxPositionerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [NgxPositionerDirective],
                    declarations: [NgxPositionerDirective],
                    providers: [NgxPositionerService]
                },] }
    ];
    return NgxPositionerModule;
}());

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