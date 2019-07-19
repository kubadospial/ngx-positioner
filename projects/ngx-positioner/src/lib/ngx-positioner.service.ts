import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from './models';

@Injectable()
export class NgxPositionerService {

    changeSettings$ = new Subject<Settings>();
    private readonly _initialSettings: Settings = {
        offset: {
            isScrolledToBottom: 0,
            isScrolledToTop: 0,
            moveToBottom: 0,
            moveToTop: 0
        },
        delay: {
            isScrolledToBottom: 0,
            isScrolledToTop: 0,
            moveToBottom: 0,
            moveToTop: 0
        },
        debounceTime: {
            isScrolledToBottom: 0,
            isScrolledToTop: 0,
            moveToBottom: 0,
            moveToTop: 0
        },
        smoothScroll: {
            moveToBottom: true,
            moveToTop: true,
            moveToBottomSpeed: 10,
            moveToTopSpeed: 10
        }
    };
    settings: Settings = this._initialSettings;
    get initialSettings(): Settings {
        console.warn('ngx-positioner: "initialSettings" variable is deprecated use "settings" variable instead.');
        return this.settings;
    }
    set initialSettings(settings: Settings) {
        console.warn('ngx-positioner: "initialSettings" variable is deprecated use "settings" variable instead.');
        this.settings = settings;
    }

    constructor() { }


}

