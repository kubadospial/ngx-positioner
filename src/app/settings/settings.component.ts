import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Settings } from 'ngx-positioner';
import { INITIAL_SETTINGS } from 'projects/ngx-positioner/src/lib/application';

@Component({
  selector: '.settings',
  styleUrls: ['./settings.component.scss'],
  templateUrl: 'settings.component.html',
})
export class SettingsComponent implements OnDestroy {
  @Output() settingChanges = new EventEmitter<Settings>();

  settings: Settings;

  settingsForm = new FormGroup({
    smoothScroll: new FormGroup({
      moveToTop: new FormControl(),
      moveToBottom: new FormControl(),
      moveToTopSpeed: new FormControl(),
      moveToBottomSpeed: new FormControl(),
    }),
    offset: new FormGroup({
      isScrolledToTop: new FormControl(),
      isScrolledToBottom: new FormControl(),
      moveToTop: new FormControl(),
      moveToBottom: new FormControl(),
    }),
    delay: new FormGroup({
      isScrolledToTop: new FormControl(),
      isScrolledToBottom: new FormControl(),
      moveToTop: new FormControl(),
      moveToBottom: new FormControl(),
    }),
    debounceTime: new FormGroup({
      isScrolledToTop: new FormControl(),
      isScrolledToBottom: new FormControl(),
      moveToTop: new FormControl(),
      moveToBottom: new FormControl(),
    }),
  });

  private _destroy$ = new Subject();

  constructor() {
    this.settingsForm.patchValue(INITIAL_SETTINGS);
    this.settingsForm.valueChanges
      .pipe(takeUntil(this._destroy$), debounceTime(300))
      .subscribe((settings: Settings) => {
        this.settingChanges.emit(settings);
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
