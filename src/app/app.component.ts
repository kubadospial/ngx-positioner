import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from 'projects/ngx-positioner/src/lib/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  moveToTop$ = new Subject<void>();
  moveToBottom$ = new Subject<void>();

  isScrolledToTop: boolean;
  isScrolledToBottom: boolean;

  positionerSettings: Settings = {
    smoothScroll: {
      moveToTop: true,
      moveToBottom: true
    }
  };

  constructor() { }

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
