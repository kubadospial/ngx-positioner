import { Injectable } from '@angular/core';
import { Settings } from '../models';

export const INITIAL_SETTINGS: Settings = {
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
    moveToTop: true,
    moveToBottomSpeed: 10,
    moveToTopSpeed: 10,
  },
};

@Injectable()
export class SettingsService {
  private _settings = INITIAL_SETTINGS;

  constructor() {}

  get settings(): Settings {
    return this._settings;
  }

  set settings(settings: Settings) {
    if (!!settings) {
      this._settings = {
        ...settings,
        offset: {
          ...this._settings.offset,
          ...settings.offset,
        },
        delay: {
          ...this._settings.delay,
          ...settings.delay,
        },
        debounceTime: {
          ...this._settings.debounceTime,
          ...settings.debounceTime,
        },
        smoothScroll: {
          ...this._settings.smoothScroll,
          ...settings.smoothScroll,
        },
      };
    } else {
      console.error(`%c Invalid settings object! `, 'color: #fff');
    }
  }
}
