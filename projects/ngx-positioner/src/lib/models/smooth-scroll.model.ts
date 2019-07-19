import { MoveEvents } from './move-events.model';

export interface SmootScroll<T> extends MoveEvents<T> {
    moveToBottomSpeed?: number;
    moveToTopSpeed?: number;
}
