import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from './models';
import { detect } from 'detect-browser';

@Injectable()
export class NgxPositionerService {

    constructor() { }

    changeSettings$ = new Subject<Settings>();
    initialSettings: Settings = {
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

    get detectBrowser(): string {
        const broName = detect().name;
        return Browser[broName]
    }

}

enum Browser {
    chrome = 'CHROME',
    firefox = 'FIREFOX',
    ios = 'SAFARI',
    edge = 'edgeEDGE',
    ie = 'IE'
}
