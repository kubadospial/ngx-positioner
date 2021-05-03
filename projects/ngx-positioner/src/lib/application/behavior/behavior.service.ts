import { Injectable } from '@angular/core';
import { ScrollBehavior } from '../../models/scroll-behavior.enum';

@Injectable()
export class BehaviorService {
  scrollableElement: HTMLElement;

  get scrollTop(): number {
    return Math.round(this.scrollableElement.scrollTop);
  }
  set scrollTop(height: number) {
    this.scrollableElement.scrollTop = Math.round(height);
  }
  constructor() {}

  async scroll(
    behavior: ScrollBehavior,
    distance: number,
    moveSpeed: number
  ): Promise<boolean> {
    return new Promise((resolve) => {
      let i = this.scrollTop;
      if (distance !== i) {
        if (behavior === ScrollBehavior.smooth) {
          const loop = setInterval(() => {
            if (distance < i) {
              const modulo = (distance + i) % 10;
              i -= modulo ? modulo : moveSpeed;
              if (i <= distance) {
                clearInterval(loop);
                resolve(true);
              }
            } else {
              const modulo = (distance - i) % 10;
              i += modulo ? modulo : moveSpeed;
              if (i >= distance) {
                clearInterval(loop);
                resolve(true);
              }
            }
            this.scrollTop = i;
          }, 0);
        } else {
          this.scrollTop = distance;
          resolve(true);
        }
      }
    });
  }
}
