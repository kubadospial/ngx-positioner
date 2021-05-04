import { Injectable } from '@angular/core';
import {
  ModuloIndicator,
  ScrollBehavior,
} from '../../models/scroll-behavior.enum';

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
  ): Promise<void> {
    return new Promise((resolve) => {
      const currentPosition = this.scrollTop;
      if (distance !== currentPosition) {
        if (behavior === ScrollBehavior.smooth) {
          this._smoothScroll(distance, currentPosition, moveSpeed, resolve);
        } else {
          this.scrollTop = distance;
          resolve();
        }
      }
    });
  }

  private _smoothScroll(
    distance: number,
    currentPosition: number,
    moveSpeed: number,
    resolve: (value: void) => void
  ) {
    const loop = setInterval(() => {
      if (distance < currentPosition) {
        currentPosition = this._moveUp(
          currentPosition,
          distance,
          moveSpeed,
          loop,
          resolve
        );
      } else {
        currentPosition = this._moveDown(
          currentPosition,
          distance,
          moveSpeed,
          loop,
          resolve
        );
      }
      this.scrollTop = currentPosition;
    }, 0);
  }

  private _moveUp(
    i: number,
    distance: number,
    moveSpeed: number,
    loop: any,
    resolve: (value: void) => void
  ): number {
    const modulo = this._calcModulo(i, distance, ModuloIndicator.increment);
    i -= modulo ? modulo : moveSpeed;
    if (i <= distance) {
      clearInterval(loop);
      resolve();
    }
    return i;
  }

  private _moveDown(
    i: number,
    distance: number,
    moveSpeed: number,
    loop: any,
    resolve: (value: void) => void
  ): number {
    const modulo = this._calcModulo(i, distance, ModuloIndicator.decrement);
    i += modulo ? modulo : moveSpeed;
    if (i >= distance) {
      clearInterval(loop);
      resolve();
    }
    return i;
  }

  private _calcModulo(
    i: number,
    distance: number,
    indicator: ModuloIndicator
  ): number {
    const incrementedDist =
      indicator === ModuloIndicator.increment
        ? distance + i
        : indicator === ModuloIndicator.decrement
        ? distance - i
        : 0;
    return incrementedDist % 10;
  }
}
