/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class NgxPositionerService {
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
if (false) {
    /** @type {?} */
    NgxPositionerService.prototype.changeSettings$;
    /** @type {?} */
    NgxPositionerService.prototype.initialSettings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBvc2l0aW9uZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wb3NpdGlvbmVyLyIsInNvdXJjZXMiOlsic3JjL2xpYi9uZ3gtcG9zaXRpb25lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0IsTUFBTSxPQUFPLG9CQUFvQjtJQUU3QjtRQUVBLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVksQ0FBQztRQUMxQyxvQkFBZSxHQUFhO1lBQ3hCLE1BQU0sRUFBRTtnQkFDSixrQkFBa0IsRUFBRSxDQUFDO2dCQUNyQixlQUFlLEVBQUUsQ0FBQztnQkFDbEIsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7YUFDZjtZQUNELEtBQUssRUFBRTtnQkFDSCxrQkFBa0IsRUFBRSxDQUFDO2dCQUNyQixlQUFlLEVBQUUsQ0FBQztnQkFDbEIsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDVixrQkFBa0IsRUFBRSxDQUFDO2dCQUNyQixlQUFlLEVBQUUsQ0FBQztnQkFDbEIsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDVixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsU0FBUyxFQUFFLElBQUk7YUFDbEI7U0FDSixDQUFDO0lBMUJjLENBQUM7OztZQUhwQixVQUFVOzs7Ozs7SUFLUCwrQ0FBMEM7O0lBQzFDLCtDQXVCRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJy4vbW9kZWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5neFBvc2l0aW9uZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIGNoYW5nZVNldHRpbmdzJCA9IG5ldyBTdWJqZWN0PFNldHRpbmdzPigpO1xyXG4gICAgaW5pdGlhbFNldHRpbmdzOiBTZXR0aW5ncyA9IHtcclxuICAgICAgICBvZmZzZXQ6IHtcclxuICAgICAgICAgICAgaXNTY3JvbGxlZFRvQm90dG9tOiAwLFxyXG4gICAgICAgICAgICBpc1Njcm9sbGVkVG9Ub3A6IDAsXHJcbiAgICAgICAgICAgIG1vdmVUb0JvdHRvbTogMCxcclxuICAgICAgICAgICAgbW92ZVRvVG9wOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsYXk6IHtcclxuICAgICAgICAgICAgaXNTY3JvbGxlZFRvQm90dG9tOiAwLFxyXG4gICAgICAgICAgICBpc1Njcm9sbGVkVG9Ub3A6IDAsXHJcbiAgICAgICAgICAgIG1vdmVUb0JvdHRvbTogMCxcclxuICAgICAgICAgICAgbW92ZVRvVG9wOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVib3VuY2VUaW1lOiB7XHJcbiAgICAgICAgICAgIGlzU2Nyb2xsZWRUb0JvdHRvbTogMCxcclxuICAgICAgICAgICAgaXNTY3JvbGxlZFRvVG9wOiAwLFxyXG4gICAgICAgICAgICBtb3ZlVG9Cb3R0b206IDAsXHJcbiAgICAgICAgICAgIG1vdmVUb1RvcDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNtb290aFNjcm9sbDoge1xyXG4gICAgICAgICAgICBtb3ZlVG9Cb3R0b206IHRydWUsXHJcbiAgICAgICAgICAgIG1vdmVUb1RvcDogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59XHJcblxyXG4iXX0=