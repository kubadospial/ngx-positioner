/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
export { NgxPositionerService };
if (false) {
    /** @type {?} */
    NgxPositionerService.prototype.changeSettings$;
    /** @type {?} */
    NgxPositionerService.prototype.initialSettings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBvc2l0aW9uZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wb3NpdGlvbmVyLyIsInNvdXJjZXMiOlsic3JjL2xpYi9uZ3gtcG9zaXRpb25lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0I7SUFHSTtRQUVBLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVksQ0FBQztRQUMxQyxvQkFBZSxHQUFhO1lBQ3hCLE1BQU0sRUFBRTtnQkFDSixrQkFBa0IsRUFBRSxDQUFDO2dCQUNyQixlQUFlLEVBQUUsQ0FBQztnQkFDbEIsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7YUFDZjtZQUNELEtBQUssRUFBRTtnQkFDSCxrQkFBa0IsRUFBRSxDQUFDO2dCQUNyQixlQUFlLEVBQUUsQ0FBQztnQkFDbEIsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDVixrQkFBa0IsRUFBRSxDQUFDO2dCQUNyQixlQUFlLEVBQUUsQ0FBQztnQkFDbEIsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDVixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsU0FBUyxFQUFFLElBQUk7YUFDbEI7U0FDSixDQUFDO0lBMUJjLENBQUM7O2dCQUhwQixVQUFVOzs7O0lBK0JYLDJCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0E5Qlksb0JBQW9COzs7SUFJN0IsK0NBQTBDOztJQUMxQywrQ0F1QkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tICcuL21vZGVscyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ3hQb3NpdGlvbmVyU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBjaGFuZ2VTZXR0aW5ncyQgPSBuZXcgU3ViamVjdDxTZXR0aW5ncz4oKTtcclxuICAgIGluaXRpYWxTZXR0aW5nczogU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgICAgIGlzU2Nyb2xsZWRUb0JvdHRvbTogMCxcclxuICAgICAgICAgICAgaXNTY3JvbGxlZFRvVG9wOiAwLFxyXG4gICAgICAgICAgICBtb3ZlVG9Cb3R0b206IDAsXHJcbiAgICAgICAgICAgIG1vdmVUb1RvcDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbGF5OiB7XHJcbiAgICAgICAgICAgIGlzU2Nyb2xsZWRUb0JvdHRvbTogMCxcclxuICAgICAgICAgICAgaXNTY3JvbGxlZFRvVG9wOiAwLFxyXG4gICAgICAgICAgICBtb3ZlVG9Cb3R0b206IDAsXHJcbiAgICAgICAgICAgIG1vdmVUb1RvcDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlYm91bmNlVGltZToge1xyXG4gICAgICAgICAgICBpc1Njcm9sbGVkVG9Cb3R0b206IDAsXHJcbiAgICAgICAgICAgIGlzU2Nyb2xsZWRUb1RvcDogMCxcclxuICAgICAgICAgICAgbW92ZVRvQm90dG9tOiAwLFxyXG4gICAgICAgICAgICBtb3ZlVG9Ub3A6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbW9vdGhTY3JvbGw6IHtcclxuICAgICAgICAgICAgbW92ZVRvQm90dG9tOiB0cnVlLFxyXG4gICAgICAgICAgICBtb3ZlVG9Ub3A6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuIl19