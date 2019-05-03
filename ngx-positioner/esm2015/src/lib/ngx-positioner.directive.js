/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, of } from 'rxjs';
import { takeUntil, debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { NgxPositionerService } from './ngx-positioner.service';
export class NgxPositionerDirective {
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
if (false) {
    /** @type {?} */
    NgxPositionerDirective.prototype.moveToTop$;
    /** @type {?} */
    NgxPositionerDirective.prototype.moveToBottom$;
    /** @type {?} */
    NgxPositionerDirective.prototype.isScrolledToTop;
    /** @type {?} */
    NgxPositionerDirective.prototype.isScrolledToBottom;
    /**
     * @type {?}
     * @private
     */
    NgxPositionerDirective.prototype._scrollableElement;
    /**
     * @type {?}
     * @private
     */
    NgxPositionerDirective.prototype._destroy$;
    /**
     * @type {?}
     * @private
     */
    NgxPositionerDirective.prototype._stopAllSubscriptions$;
    /**
     * @type {?}
     * @private
     */
    NgxPositionerDirective.prototype._scrollingEvent;
    /**
     * @type {?}
     * @private
     */
    NgxPositionerDirective.prototype._settings;
    /**
     * @type {?}
     * @private
     */
    NgxPositionerDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    NgxPositionerDirective.prototype.document;
    /**
     * @type {?}
     * @private
     */
    NgxPositionerDirective.prototype.positionerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBvc2l0aW9uZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXBvc2l0aW9uZXIvIiwic291cmNlcyI6WyJzcmMvbGliL25neC1wb3NpdGlvbmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdoRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUloRSxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7SUFnQi9CLFlBQ1ksRUFBYyxFQUNJLFFBQVEsRUFDMUIsaUJBQXVDO1FBRnZDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDSSxhQUFRLEdBQVIsUUFBUSxDQUFBO1FBQzFCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBc0I7UUFkMUMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDakMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ25DLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUM5Qyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBR25ELGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ2hDLDJCQUFzQixHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDN0Msb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBTzFD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QUFrQzs7Ozs7SUFDbEMsbURBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QsIG9mLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCwgZGVib3VuY2VUaW1lLCBkZWxheSwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJy4vbW9kZWxzJztcclxuaW1wb3J0IHsgTmd4UG9zaXRpb25lclNlcnZpY2UgfSBmcm9tICcuL25neC1wb3NpdGlvbmVyLnNlcnZpY2UnO1xyXG5cclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3hQb3NpdGlvbmVyXScgfSlcclxuZXhwb3J0IGNsYXNzIE5neFBvc2l0aW9uZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoJ3NldHRpbmdzJylcclxuICAgIHNldCBzZXR0aW5ncyhzZXR0aW5nczogU2V0dGluZ3MpIHtcclxuICAgICAgICB0aGlzLl9tZXJnZVNldHR0aW5ncyhzZXR0aW5ncyk7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBtb3ZlVG9Ub3AkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICAgIEBJbnB1dCgpIG1vdmVUb0JvdHRvbSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gICAgQE91dHB1dCgpIGlzU2Nyb2xsZWRUb1RvcCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAgIEBPdXRwdXQoKSBpc1Njcm9sbGVkVG9Cb3R0b20gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2Nyb2xsYWJsZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gICAgcHJpdmF0ZSBfc3RvcEFsbFN1YnNjcmlwdGlvbnMkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICAgIHByaXZhdGUgX3Njcm9sbGluZ0V2ZW50ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICAgIHByaXZhdGUgX3NldHRpbmdzOiBTZXR0aW5ncztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBwb3NpdGlvbmVyU2VydmljZTogTmd4UG9zaXRpb25lclNlcnZpY2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pc1Njcm9sbGVkVG9Ub3AubmV4dCh0aGlzLl9pc1Njcm9sbGVkVG9Ub3BDb25kaXRpb24pO1xyXG4gICAgICAgIHRoaXMuaXNTY3JvbGxlZFRvQm90dG9tLm5leHQodGhpcy5faXNTY3JvbGxlZFRvQm90dG9tQ29uZGl0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVN1YnNjcmlwdGlvbnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbmVyU2VydmljZS5jaGFuZ2VTZXR0aW5ncyQucGlwZShcclxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKChzZXR0aW5nczogU2V0dGluZ3MpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcEFsbFN1YnNjcmlwdGlvbnMkLm5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWVyZ2VTZXR0dGluZ3Moc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplU3Vic2NyaXB0aW9ucygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuX3N0b3BBbGxTdWJzY3JpcHRpb25zJC5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fc3RvcEFsbFN1YnNjcmlwdGlvbnMkLmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdGlhbGl6ZVN1YnNjcmlwdGlvbnMoKSB7XHJcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX3Njcm9sbGFibGVFbGVtZW50LCAnc2Nyb2xsJykucGlwZShcclxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX3N0b3BBbGxTdWJzY3JpcHRpb25zJCksXHJcbiAgICAgICAgKS5zdWJzY3JpYmUoXyA9PiB0aGlzLl9zY3JvbGxpbmdFdmVudC5uZXh0KCkpO1xyXG5cclxuICAgICAgICAvLyBUT1BcclxuICAgICAgICB0aGlzLl9zY3JvbGxpbmdFdmVudC5waXBlKFxyXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUodGhpcy5fc2V0dGluZ3MuZGVib3VuY2VUaW1lLmlzU2Nyb2xsZWRUb1RvcCksXHJcbiAgICAgICAgICAgIGRlbGF5KHRoaXMuX3NldHRpbmdzLmRlbGF5LmlzU2Nyb2xsZWRUb1RvcCksXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcChfID0+IG9mKHRoaXMuX2lzU2Nyb2xsZWRUb1RvcENvbmRpdGlvbikpLFxyXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fc3RvcEFsbFN1YnNjcmlwdGlvbnMkKSxcclxuICAgICAgICApLnN1YnNjcmliZSgoaXNTY3JvbGxlZFRvVG9wOiBib29sZWFuKSA9PiB0aGlzLmlzU2Nyb2xsZWRUb1RvcC5uZXh0KGlzU2Nyb2xsZWRUb1RvcCkpO1xyXG5cclxuICAgICAgICAvLyBCT1RUT01cclxuICAgICAgICB0aGlzLl9zY3JvbGxpbmdFdmVudC5waXBlKFxyXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUodGhpcy5fc2V0dGluZ3MuZGVib3VuY2VUaW1lLmlzU2Nyb2xsZWRUb0JvdHRvbSksXHJcbiAgICAgICAgICAgIGRlbGF5KHRoaXMuX3NldHRpbmdzLmRlbGF5LmlzU2Nyb2xsZWRUb0JvdHRvbSksXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcChfID0+IG9mKHRoaXMuX2lzU2Nyb2xsZWRUb0JvdHRvbUNvbmRpdGlvbikpLFxyXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fc3RvcEFsbFN1YnNjcmlwdGlvbnMkKSxcclxuICAgICAgICApLnN1YnNjcmliZSgoaXNTY3JvbGxlZFRvQm90dG9tOiBib29sZWFuKSA9PiB0aGlzLmlzU2Nyb2xsZWRUb0JvdHRvbS5uZXh0KGlzU2Nyb2xsZWRUb0JvdHRvbSkpO1xyXG5cclxuICAgICAgICB0aGlzLm1vdmVUb1RvcCQucGlwZShcclxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKHRoaXMuX3NldHRpbmdzLmRlYm91bmNlVGltZS5tb3ZlVG9Ub3ApLFxyXG4gICAgICAgICAgICBkZWxheSh0aGlzLl9zZXR0aW5ncy5kZWxheS5tb3ZlVG9Ub3ApLFxyXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fc3RvcEFsbFN1YnNjcmlwdGlvbnMkKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKF8gPT4gdGhpcy5fb25Nb3ZlVG9Ub3AoKSk7XHJcblxyXG4gICAgICAgIHRoaXMubW92ZVRvQm90dG9tJC5waXBlKFxyXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUodGhpcy5fc2V0dGluZ3MuZGVib3VuY2VUaW1lLm1vdmVUb0JvdHRvbSksXHJcbiAgICAgICAgICAgIGRlbGF5KHRoaXMuX3NldHRpbmdzLmRlbGF5Lm1vdmVUb0JvdHRvbSksXHJcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9zdG9wQWxsU3Vic2NyaXB0aW9ucyQpLFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoXyA9PiB0aGlzLl9vbk1vdmVUb0JvdHRvbSgpKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKGhlaWdodCA9PiB0aGlzLl9zY3JvbGxhYmxlRWxlbWVudC5zY3JvbGwoeyBiZWhhdmlvcjogdGhpcy5fbW92ZVRvQm90dG9tQmVoYXZpb3IsIHRvcDogaGVpZ2h0ICsgdGhpcy5fbW92ZUJvdHREaWZmT2Zmc2V0IH0pKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21lcmdlU2V0dHRpbmdzKHNldHRpbmdzOiBTZXR0aW5ncykge1xyXG4gICAgICAgIGlmICghIXNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgLi4uc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnBvc2l0aW9uZXJTZXJ2aWNlLmluaXRpYWxTZXR0aW5ncy5vZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc2V0dGluZ3Mub2Zmc2V0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnBvc2l0aW9uZXJTZXJ2aWNlLmluaXRpYWxTZXR0aW5ncy5kZWxheSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5zZXR0aW5ncy5kZWxheVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucG9zaXRpb25lclNlcnZpY2UuaW5pdGlhbFNldHRpbmdzLmRlYm91bmNlVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5zZXR0aW5ncy5kZWJvdW5jZVRpbWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc21vb3RoU2Nyb2xsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wb3NpdGlvbmVyU2VydmljZS5pbml0aWFsU2V0dGluZ3Muc21vb3RoU2Nyb2xsLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLnNldHRpbmdzLnNtb290aFNjcm9sbCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5fc2V0U2Nyb2xsYWJsZUVsZW1lbnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAlYyBJbnZhbGlkIHNldHRpbmdzIG9iamVjdCEgYCwgJ2NvbG9yOiAjZmZmJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NldFNjcm9sbGFibGVFbGVtZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbGFibGVFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGlmICghIXRoaXMuX3NldHRpbmdzLnNjcm9sbGFibGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbEVsOiBIVE1MRWxlbWVudCA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9zZXR0aW5ncy5zY3JvbGxhYmxlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICghIXNjcm9sbEVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxhYmxlRWxlbWVudCA9IHNjcm9sbEVsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJWMgQ291bGRuJ3QgZmluZCAkeyB0aGlzLl9zZXR0aW5ncy5zY3JvbGxhYmxlRWxlbWVudCB9IGluIERPTSEgYCwgJ2NvbG9yOiAjZmZmJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb25Nb3ZlVG9Ub3AoKSB7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQuc2Nyb2xsKHsgYmVoYXZpb3I6IHRoaXMuX21vdmVUb1RvcEJlaGF2aW9yLCB0b3A6IHRoaXMuX21vdmVUb1RvcE9mZnNldCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9vbk1vdmVUb0JvdHRvbSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiBvZih0aGlzLl9tb3ZlVG9Cb3R0b21PZmZzZXQpLnBpcGUoXHJcbiAgICAgICAgICAgIHRhcChoZWlnaHQgPT4gdGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQuc2Nyb2xsKHsgYmVoYXZpb3I6IHRoaXMuX21vdmVUb0JvdHRvbUJlaGF2aW9yLCB0b3A6IGhlaWdodCB9KSksXHJcbiAgICAgICAgICAgIGRlbGF5KHRoaXMuX3NldHRpbmdzLnNtb290aFNjcm9sbC5tb3ZlVG9Cb3R0b20gPyA2MDAgOiAwKVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBfbW92ZVRvVG9wQmVoYXZpb3IoKTogU2Nyb2xsQmVoYXZpb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5zbW9vdGhTY3JvbGwubW92ZVRvVG9wID8gJ3Ntb290aCcgOiAnYXV0byc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgX21vdmVUb0JvdHRvbUJlaGF2aW9yKCk6IFNjcm9sbEJlaGF2aW9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3Muc21vb3RoU2Nyb2xsLm1vdmVUb0JvdHRvbSA/ICdzbW9vdGgnIDogJ2F1dG8nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IF9pc1Njcm9sbGVkVG9Ub3BDb25kaXRpb24oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbGFibGVFbGVtZW50LnNjcm9sbFRvcCA8PSB0aGlzLl9pc1Njcm9sbGVkVG9Ub3BPZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgX2lzU2Nyb2xsZWRUb0JvdHRvbUNvbmRpdGlvbigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQuc2Nyb2xsVG9wICsgdGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQuY2xpZW50SGVpZ2h0ID49IHRoaXMuX2lzU2Nyb2xsZWRUb0JvdHRvbU9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBfaXNTY3JvbGxlZFRvVG9wT2Zmc2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5vZmZzZXQuaXNTY3JvbGxlZFRvVG9wO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IF9pc1Njcm9sbGVkVG9Cb3R0b21PZmZzZXQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5fc2V0dGluZ3Mub2Zmc2V0LmlzU2Nyb2xsZWRUb0JvdHRvbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBfbW92ZVRvVG9wT2Zmc2V0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLm9mZnNldC5tb3ZlVG9Ub3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgX21vdmVUb0JvdHRvbU9mZnNldCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3Mub2Zmc2V0Lm1vdmVUb0JvdHRvbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxhYmxlRWxlbWVudC5vZmZzZXRIZWlnaHQgLSB0aGlzLl9zZXR0aW5ncy5vZmZzZXQubW92ZVRvQm90dG9tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBfbW92ZUJvdHREaWZmT2Zmc2V0KCkge1xyXG4gICAgICAgIGxldCBkaWZmID0gdGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQuc2Nyb2xsVG9wIC0gdGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGlmICghIXRoaXMuX3NldHRpbmdzLm9mZnNldC5tb3ZlVG9Cb3R0b20pIHtcclxuICAgICAgICAgICAgZGlmZiA9ICh0aGlzLl9zY3JvbGxhYmxlRWxlbWVudC5zY3JvbGxIZWlnaHQgLSAodGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQuc2Nyb2xsVG9wICsgdGhpcy5fc2Nyb2xsYWJsZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSkgLSB0aGlzLl9zZXR0aW5ncy5vZmZzZXQubW92ZVRvQm90dG9tO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGlmZjtcclxuICAgIH1cclxufVxyXG4iXX0=