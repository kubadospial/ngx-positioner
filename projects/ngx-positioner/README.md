# ngx-positioner

If You want to use smooth scroll top/bottom on DOM element or check if element is at the bottom of scrollable element?
Keep on reading!

ngx-positioner is an Angular 9+ directive which allows to determin position of scrollable DOM element. So basicly the directive tells if scrollable element is scrolled top/bottom.
Additionaly You can move to bottom/top element using smooth scroll or instant scroll.

## Demo

Check the [link](https://stackblitz.com/edit/ngx-positioner)

## Usage

Install ngx-positioner

- npm: `$ npm install @kubadospial/ngx-positioner`
- yarn: `$ yarn add @kubadospial/ngx-positioner`

import NgxPositionerModule

```js
import { NgxPositionerModule } from '@kubadospial/ngx-positioner';

@NgModule({
  imports: [
    NgxPositionerModule
  ]
})
```

Use NgxPositionerDirective

```js
import { Settings } from '@kubadospial/ngx-positioner';


@Component(...)
export class SomeComponent {
  moveToTop$ = new Subject<any>();
  moveToBottom$ = new Subject<any>();

  positionerSettings: Settings = {
    smoothScroll: {
      moveToTop: true,
      moveToBottom: true
    }
  };

  onSettingsChanged(settings: Settings) {
    this.positionerSettings = settings;
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
  // or [ngxPositioner]="'.child2'"
  [settings]="positionerSettings"
  [moveToTop$]="moveToTop$"
  [moveToBottom$]="moveToBottom$"
  (isScrolledToTop)="onScrolledToTop($event)"
  (isScrolledToBottom)="onScrolledToBottom($event)"
>
  <div class="child">// long content</div>
  <div class="child2"> .... </div>
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
}
```

## Directive

### Inputs:

- ngxPositioner: string;
- settings: Settings;
- moveToTop$: Subject;
- moveToBottom$: Subject;

```
ngxPositioner: optional input - that allows to pass string for querySelector if you want to assign other scrollable element than default. The default is host of the directive;
setting: optional input - passes settings object;
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
