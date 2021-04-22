import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    behavior: string,
    height: number,
    moveSpeed: number
  ): Promise<boolean> {
    return new Promise((resolve) => {
      let i = this.scrollTop;
      if (height !== i) {
        if (behavior === ScrollBehavior.smooth) {
          const loop = setInterval(() => {
            if (height < i) {
              const modulo = (height + i) % 10;
              i -= modulo ? modulo : moveSpeed;
              if (i <= height) {
                clearInterval(loop);
                resolve(true);
              }
            } else {
              const modulo = (height - i) % 10;
              i += modulo ? modulo : moveSpeed;
              if (i >= height) {
                clearInterval(loop);
                resolve(true);
              }
            }
            this.scrollTop = i;
          }, 0);
        } else {
          this.scrollTop = height;
          resolve(true);
        }
      }
    });
  }
}
