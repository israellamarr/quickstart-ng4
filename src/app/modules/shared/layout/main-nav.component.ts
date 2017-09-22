import { Component, OnInit }        from '@angular/core';
import { CommonModule }             from '@angular/common';

import { AppSettings }              from '../../../config/app.settings';

import { fadeInOut, fadeAndHide, slideInOutAnimation }  from '../animations/animations';

@Component({
    selector: 'main-header-nav',
    templateUrl: './main-nav.component.html',
    animations: [ fadeInOut, fadeAndHide, slideInOutAnimation ]
})
export class MainNavComponent implements OnInit {

    mainNavStatus: string = "inactive";
    appSettings: any = AppSettings;

    constructor() {}

    ngOnInit(): void {

    }

    toggleMainNav(): void {
        if ( ! this.isMainNavOpen()) {
            this.openMainNav();
        } else {
            this.closeMainNav();
        }
    }

    isMainNavOpen(): boolean {
        return (this.mainNavStatus == "active");
    }

    openMainNav(): void {
        this.mainNavStatus = "active";
    }

    closeMainNav(): void {
        this.mainNavStatus = "inactive";
    }

}
