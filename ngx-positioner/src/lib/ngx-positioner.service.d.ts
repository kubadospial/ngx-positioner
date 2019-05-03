import { Subject } from 'rxjs';
import { Settings } from './models';
export declare class NgxPositionerService {
    constructor();
    changeSettings$: Subject<Settings>;
    initialSettings: Settings;
}
