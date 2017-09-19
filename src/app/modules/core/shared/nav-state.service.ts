import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NavStateService {

    // Observable string sources
    private navAdjustmentSource = new Subject<string>();

    // Observable string streams
    navAdjustmentAnnounced$ = this.navAdjustmentSource.asObservable();

    moduleNavToggle(moduleNavOpenStatus: string) {
    	console.log(moduleNavOpenStatus);
        this.navAdjustmentSource.next(moduleNavOpenStatus);
    }

}
