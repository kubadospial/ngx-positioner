import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxPositionerService } from 'projects/ngx-positioner/src/lib/ngx-positioner.service';
import { Settings } from 'projects/ngx-positioner/src/lib/models';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: '.settings',
    templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {

    @Output() settingChanges = new EventEmitter<Settings>();

    settings: Settings = {
        childElement: '.child',

    };

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
            console.log(sets);
            this.positionerService.changeSettings$.next(sets);
        });
    }

    ngOnInit() { }
}
