(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-positioner', ['exports', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/common'], factory) :
    (factory((global['ngx-positioner'] = {}),global.rxjs,global.rxjs.operators,global.ng.core,global.ng.common));
}(this, (function (exports,rxjs,operators,core,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPositionerService = /** @class */ (function () {
        function NgxPositionerService() {
            this.changeSettings$ = new rxjs.Subject();
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxPositionerService.ctorParameters = function () { return []; };
        return NgxPositionerService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPositionerDirective = /** @class */ (function () {
        function NgxPositionerDirective(el, document, positionerService) {
            this.el = el;
            this.document = document;
            this.positionerService = positionerService;
            this.moveToTop$ = new rxjs.Subject();
            this.moveToBottom$ = new rxjs.Subject();
            this.isScrolledToTop = new core.EventEmitter();
            this.isScrolledToBottom = new core.EventEmitter();
            this._destroy$ = new rxjs.Subject();
            this._stopAllSubscriptions$ = new rxjs.Subject();
            this._scrollingEvent = new rxjs.Subject();
        }
        Object.defineProperty(NgxPositionerDirective.prototype, "settings", {
            set: /**
             * @param {?} settings
             * @return {?}
             */ function (settings) {
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
                this.positionerService.changeSettings$.pipe(operators.takeUntil(this._destroy$)).subscribe(( /**
                 * @param {?} settings
                 * @return {?}
                 */function (settings) {
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
                rxjs.fromEvent(this._scrollableElement, 'scroll').pipe(operators.takeUntil(this._stopAllSubscriptions$)).subscribe(( /**
                 * @param {?} _
                 * @return {?}
                 */function (_) { return _this._scrollingEvent.next(); }));
                // TOP
                this._scrollingEvent.pipe(operators.debounceTime(this._settings.debounceTime.isScrolledToTop), operators.delay(this._settings.delay.isScrolledToTop), operators.switchMap(( /**
                 * @param {?} _
                 * @return {?}
                 */function (_) { return rxjs.of(_this._isScrolledToTopCondition); })), operators.takeUntil(this._stopAllSubscriptions$)).subscribe(( /**
                 * @param {?} isScrolledToTop
                 * @return {?}
                 */function (isScrolledToTop) { return _this.isScrolledToTop.next(isScrolledToTop); }));
                // BOTTOM
                this._scrollingEvent.pipe(operators.debounceTime(this._settings.debounceTime.isScrolledToBottom), operators.delay(this._settings.delay.isScrolledToBottom), operators.switchMap(( /**
                 * @param {?} _
                 * @return {?}
                 */function (_) { return rxjs.of(_this._isScrolledToBottomCondition); })), operators.takeUntil(this._stopAllSubscriptions$)).subscribe(( /**
                 * @param {?} isScrolledToBottom
                 * @return {?}
                 */function (isScrolledToBottom) { return _this.isScrolledToBottom.next(isScrolledToBottom); }));
                this.moveToTop$.pipe(operators.debounceTime(this._settings.debounceTime.moveToTop), operators.delay(this._settings.delay.moveToTop), operators.takeUntil(this._stopAllSubscriptions$)).subscribe(( /**
                 * @param {?} _
                 * @return {?}
                 */function (_) { return _this._onMoveToTop(); }));
                this.moveToBottom$.pipe(operators.debounceTime(this._settings.debounceTime.moveToBottom), operators.delay(this._settings.delay.moveToBottom), operators.takeUntil(this._stopAllSubscriptions$), operators.switchMap(( /**
                 * @param {?} _
                 * @return {?}
                 */function (_) { return _this._onMoveToBottom(); }))).subscribe(( /**
                 * @param {?} height
                 * @return {?}
                 */function (height) { return _this._scrollableElement.scroll({ behavior: _this._moveToBottomBehavior, top: height + _this._moveBottDiffOffset }); }));
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
                return rxjs.of(this._moveToBottomOffset).pipe(operators.tap(( /**
                 * @param {?} height
                 * @return {?}
                 */function (height) { return _this._scrollableElement.scroll({ behavior: _this._moveToBottomBehavior, top: height }); })), operators.delay(this._settings.smoothScroll.moveToBottom ? 600 : 0));
            };
        Object.defineProperty(NgxPositionerDirective.prototype, "_moveToTopBehavior", {
            get: /**
             * @private
             * @return {?}
             */ function () {
                return this._settings.smoothScroll.moveToTop ? 'smooth' : 'auto';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxPositionerDirective.prototype, "_moveToBottomBehavior", {
            get: /**
             * @private
             * @return {?}
             */ function () {
                return this._settings.smoothScroll.moveToBottom ? 'smooth' : 'auto';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxPositionerDirective.prototype, "_isScrolledToTopCondition", {
            get: /**
             * @private
             * @return {?}
             */ function () {
                return this._scrollableElement.scrollTop <= this._isScrolledToTopOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxPositionerDirective.prototype, "_isScrolledToBottomCondition", {
            get: /**
             * @private
             * @return {?}
             */ function () {
                return this._scrollableElement.scrollTop + this._scrollableElement.clientHeight >= this._isScrolledToBottomOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxPositionerDirective.prototype, "_isScrolledToTopOffset", {
            get: /**
             * @private
             * @return {?}
             */ function () {
                return this._settings.offset.isScrolledToTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxPositionerDirective.prototype, "_isScrolledToBottomOffset", {
            get: /**
             * @private
             * @return {?}
             */ function () {
                return this._scrollableElement.scrollHeight - this._settings.offset.isScrolledToBottom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxPositionerDirective.prototype, "_moveToTopOffset", {
            get: /**
             * @private
             * @return {?}
             */ function () {
                return this._settings.offset.moveToTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxPositionerDirective.prototype, "_moveToBottomOffset", {
            get: /**
             * @private
             * @return {?}
             */ function () {
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
             */ function () {
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
            { type: core.Directive, args: [{ selector: '[ngxPositioner]' },] }
        ];
        /** @nocollapse */
        NgxPositionerDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
                { type: NgxPositionerService }
            ];
        };
        NgxPositionerDirective.propDecorators = {
            settings: [{ type: core.Input, args: ['settings',] }],
            moveToTop$: [{ type: core.Input }],
            moveToBottom$: [{ type: core.Input }],
            isScrolledToTop: [{ type: core.Output }],
            isScrolledToBottom: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
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

    exports.NgxPositionerService = NgxPositionerService;
    exports.NgxPositionerDirective = NgxPositionerDirective;
    exports.NgxPositionerModule = NgxPositionerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-positioner.umd.js.map