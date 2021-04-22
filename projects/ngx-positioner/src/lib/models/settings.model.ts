import { PositionEvents } from './position-events.model';
import { SmootScroll } from './smooth-scroll.model';

export interface Settings {
  offset?: PositionEvents;
  delay?: PositionEvents;
  debounceTime?: PositionEvents;
  smoothScroll?: SmootScroll<boolean>;
}
