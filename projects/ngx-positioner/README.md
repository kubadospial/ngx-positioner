# ngx-positioner

If You want to use smooth scroll top/bottom on DOM element or check if element is at the bottom of scrollable element?
Keep on reading!

ngx-positioner is an Angular 6+ directive which allows to determin position of scrollable DOM element. So basicly the directive tells if scrollable element is scrolled top/bottom.
Additionaly You can move to bottom/top element using smooth scroll or instant scroll.

## Note

```
Update:
You can control speed of moveToTop / moveToBottom by declaring number for both separately:
settings.smoothScroll.moveToTopSpeed = number / settings.smoothScroll.moveToBottomSpeed = number

Service variable "initialSettings" is deprecated and in future it will remain but it won't be accesable.
Instead use "settings" variable.

---------------------------------------------------------------------------------------------------
Directive requires Rxjs version >= 6.0.0.
Full browser compatibility.
```

## Demo

Check the [link](https://kubadospial.github.io/ngx-positioner/)

## Usage

Install ngx-positioner

- npm: `$ npm install ngx-positioner`
- yarn: `$ yarn add ngx-positioner`

import NgxPositionerModule

```js
import { NgxPositionerModule } from 'ngx-positioner';

@NgModule({
  declarations: [...],
  imports: [
    ...
    NgxPositionerModule
  ],
  providers: []
})
```

Use NgxPositionerDirective

```js
import { Settings } from 'ngx-positioner';


@Component(...)
export class SomeComponent {
  ...
  positionerSettings: Settings = {
    smoothScroll: {
      moveToTop: true,
      moveToBottom: true
    }
  };

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

```

And

```html
<div class="panel">
  ...
  <div (click)="moveToTop()">move to top</div>
  <div (click)="moveToBottom()">move to bottom</div>
</div>

<div
  class="parent"
  ngxPositioner
  (isScrolledToTop)="onScrolledToTop($event)"
  (isScrolledToBottom)="onScrolledToBottom($event)"
  [settings]="positionerSettings"
  [moveToTop$]="moveToTop$"
  [moveToBottom$]="moveToBottom$"
>
  <div class="child">// long content</div>
</div>
```

## Settings Model

```js
offset: {
    isScrolledToBottom: number // default 0
    isScrolledToTop: number // default 0
    moveToBottom: number // default 0
    moveToTop: number // default 0
},
delay: {
    isScrolledToBottom: number // default 0
    isScrolledToTop: number // default 0
    moveToBottom: number // default 0
    moveToTop: number // default 0
},
debounceTime: {
    isScrolledToBottom: number // default 0
    isScrolledToTop: number // default 0
    moveToBottom: number // default 0
    moveToTop: number // default 0
},
smoothScroll: {
    moveToBottom: boolean, // default true
    moveToTop: boolean // default true
    moveToBottomSpeed: number // default 10
    moveToTopSpeed: number // default 10
},
scrollableElement: string // querySelector*

```

\*_if not declared, host of directive will be assigned by default_

## Directive

### Inputs:

- settings: Settings;
- moveToTop$: Subject;
- moveToBottom$: Subject;

```
setting: passes settings object;
moveToTop$: scroll to the top of scrollable element;
moveToBottom$: scroll to the bottom of scrollable element;
```

### Outputs:

- isScrolledToTop: boolean;
- isScrolledToBottom: boolean;

```
isScrolledToTop: EventEmitter that emits boolean is scrollable element is at top;
isScrolledToBottom: EventEmitter that emits boolean is scrollable element is at bottom;
```

## Service

```
changeSettings$: Subject<Settings>;
settings: Settings;
initialSettings: Settings; // this variable is deprecated
```

You can dynamically change directive's settings by emitting new object:

```js
import { Settings } from 'ngx-positioner/models';
import { NgxPositionerService } from 'ngx-positioner';

@Component(...)
export class SomeComponent {
  ...
  constructor(private positionService: NgxPositionerServce) { }

  someMethod(settings: Settings) {
    this.positionService.changeSettings$.next(settings);
  }
}

```

## Contributing

1. Fork repo.
2. `npm install / yarn`.
3. Make your changes.
4. Add your tests.
5. `npm run test / yarn start test`.
6. `npm run build / yarn start build`.
7. After all tests are passing.
8. Commit, push, PR.

## License

Released under the terms of MIT License.
