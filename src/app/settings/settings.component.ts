import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Settings, NgxPositionerService } from 'ngx-positioner';

@Component({
    selector: '.settings',
    styleUrls: ['./settings.component.scss'],
    templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {

    @Output() settingChanges = new EventEmitter<Settings>();

    settings: Settings;

    settingsForm = new FormGroup({

        smoothScroll: new FormGroup({
            moveToTop: new FormControl(),
            moveToBottom: new FormControl(),
        }),
        offset: new FormGroup({
            isScrolledToTop: new FormControl(),
            isScrolledToBottom: new FormControl(),
            moveToTop: new FormControl(),
            moveToBottom: new FormControl()
        }),
        delay: new FormGroup({
            isScrolledToTop: new FormControl(),
            isScrolledToBottom: new FormControl(),
            moveToTop: new FormControl(),
            moveToBottom: new FormControl()
        }),
        debounceTime: new FormGroup({
            isScrolledToTop: new FormControl(),
            isScrolledToBottom: new FormControl(),
            moveToTop: new FormControl(),
            moveToBottom: new FormControl()
        })
    });

    constructor(private positionerService: NgxPositionerService) {
        this.settingsForm.patchValue(this.positionerService.initialSettings);
        this.settingsForm.valueChanges.pipe(
            debounceTime(300)
        ).subscribe((settings: Settings) => {
            const sets = { ...settings, childElement: '.child' };
            this.positionerService.initialSettings = sets;
            this.positionerService.changeSettings$.next(sets);
        });
    }

    ngOnInit() { }
}
