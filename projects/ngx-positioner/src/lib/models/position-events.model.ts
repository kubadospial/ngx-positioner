import { MoveEvents } from './move-events.model';

export interface PositionEvents extends MoveEvents<number> {
    isScrolledToBottom: number;
    isScrolledToTop: number;
}
