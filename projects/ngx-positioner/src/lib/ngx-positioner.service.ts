import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from './models';

@Injectable()
export class NgxPositionerService {

    constructor() { }

    changeSettings$ = new Subject<Settings>();
    initialSettings: Settings = {
        offset: {
            isScrolledToBottom: 0,
            isScrolledToTop: 0,
            moveToBottom: 100,
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
            moveToBottom: false,
            moveToTop: false
        },
        childElement: ''
    };
}
