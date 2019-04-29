import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Settings } from 'projects/ngx-positioner/src/lib/models';
import { NgxPositionerService } from 'projects/ngx-positioner/src/lib/ngx-positioner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  topSmoothScrollToggler = new FormControl(true);
  bottomSmoothScrollToggler = new FormControl(true);

  moveToTop$ = new Subject<void>();
  moveToBottom$ = new Subject<void>();

  isScrolledToTop: boolean;
  isScrolledToBottom: boolean;

  positionerSettings: Settings = {
    childElement: '.child',
    smoothScroll: {
      moveToTop: true,
      moveToBottom: true
    }
  };

  constructor(private positionerService: NgxPositionerService) {
    this.topSmoothScrollToggler.valueChanges.subscribe(isTop => {
      this.positionerSettings.smoothScroll.moveToTop = isTop;
      this.positionerService.changeSettings$.next(this.positionerSettings);
    });

    this.bottomSmoothScrollToggler.valueChanges.subscribe(isbottom => {
      this.positionerSettings.smoothScroll.moveToBottom = isbottom;
      this.positionerService.changeSettings$.next(this.positionerSettings);
    });
  }

  onScrolledToTop(isTop: boolean) {
    this.isScrolledToTop = isTop;
  }

  onScrolledToBottom(isBottom: boolean) {
    this.isScrolledToBottom = isBottom;
  }

  moveToTop() {
    this.moveToTop$.next();
  }

  moveToBottom() {
    this.moveToBottom$.next();
  }
}
