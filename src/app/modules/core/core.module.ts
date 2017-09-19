import { NgModule, Optional, SkipSelf } from '@angular/core';

import { MaterialModule }               from '@angular/material';
import { NgbModule }                    from '@ng-bootstrap/ng-bootstrap';

import { AppSettings }                  from '../../config/app.settings';

import { AuthenticationService }        from './auth/authentication.service';
import { AuthenticationGuard }          from './auth/authentication-guard.service';
import { CanDeactivateGuard }           from './auth/can-deactivate-guard.service';
import { RoleGuard }                    from './auth/role-guard.service';
import { LayoutService }                from './shared/layout.service';
import { NavStateService }              from './shared/nav-state.service';

import { AuthModule }                   from './auth/auth.module';

@NgModule({
    imports: [
        NgbModule,
        AuthModule
    ],
    providers: [
        AuthenticationService,
        AuthenticationGuard,
        RoleGuard,
        CanDeactivateGuard,
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
