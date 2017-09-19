import { Component, OnDestroy }     from '@angular/core';
import { Subscription }             from 'rxjs/Subscription';

import { LayoutService }            from '../../core/shared/layout.service';

@Component({
  selector: 'main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnDestroy {

    private accountLeftNav: boolean;
    private hideFooter: boolean;
    layoutSubscription: Subscription;

    constructor(private layoutService: LayoutService) {
        this.layoutSubscription = layoutService.stateChanged$.subscribe(
            layout => {
                this.accountLeftNav = layout.accountLeftNav;
                this.hideFooter = layout.hideFooter;
            }
        );
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.layoutSubscription.unsubscribe();
    }

}
