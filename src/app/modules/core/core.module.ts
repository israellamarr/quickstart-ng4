import { NgModule, Optional, SkipSelf } from '@angular/core';

import { MaterialModule }               from '@angular/material';

import { AppSettings }                  from '../../config/app.settings';

import { LayoutService }                from './shared/layout.service';
import { NavStateService }              from './shared/nav-state.service';

@NgModule({
    imports: [

    ],
    providers: [
        LayoutService,
        NavStateService
    ]
})
export class CoreModule {

    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error ('CoreModule is already loaded. Import it in the AppModule only.');
        }
    }

}
