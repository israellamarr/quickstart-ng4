import { Component }                from '@angular/core';
import { CommonModule }             from '@angular/common';
import { Router, NavigationStart }  from '@angular/router';
import { Subscription }             from 'rxjs/Subscription';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppSettings }              from '../../../config/app.settings';

import { slideRightLeftAnimation }  from '../animations/animations';
import { AuthenticationService }    from '../../core/auth/authentication.service';

@Component({
  selector: 'main-header-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  animations: [ slideRightLeftAnimation ]
})
export class MainNavComponent {

    isUserAuthenticated: boolean;
    loggedInSubscription: Subscription;
    isIn = "inactive";   // store state
    appSettings: any = AppSettings;

    online$: Observable<boolean>;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.online$ = Observable.merge(
            Observable.of(navigator.onLine),
            Observable.fromEvent(window, 'online').mapTo(true),
            Observable.fromEvent(window, 'offline').mapTo(false)
        )
        this.loggedInSubscription = authenticationService.isLoggedInStateChanged$.subscribe(
            isUserAuthenticated => {
                this.isUserAuthenticated = isUserAuthenticated;
        });
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.closeNav();
            }
        });
    }

    toggleState() { // click handler
        if ( ! this.isOpen()) {
        	this.openNav();
        } else {
        	this.closeNav();
        }
    }

    isOpen(): boolean {
        return (this.isIn == "active");
    }

    openNav(): void {
        this.isIn = "active";
    }

    closeNav(): void {
        this.isIn = "inactive";
    }

    signOut(): void {
        this.isUserAuthenticated = false;
        this.authenticationService.signOut();
    }

}
