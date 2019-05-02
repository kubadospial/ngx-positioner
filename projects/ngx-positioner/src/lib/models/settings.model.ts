import { PositionEvents } from './position-events.model';
import { MoveEvents } from './move-events.model';

export interface Settings {
    offset?: PositionEvents;
    delay?: PositionEvents;
    debounceTime?: PositionEvents;
    smoothScroll?: MoveEvents<boolean>;
    scrollableElement?: string;
}
