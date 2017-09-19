import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { DOMEvents } from "./modules/core/shared/dom-events"; // _IH - for app loading screen

import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DOMEvents]
})
export class AppComponent implements OnInit {

    title = 'Hive';
    hasLeftNav = false;

    constructor(public router: Router, public route: ActivatedRoute, public domEvents: DOMEvents) { }

    ngOnInit(): void {
        // this little piece of code scrolls the user to the top of the screen when they navigate to a new page - the expected behaviour
        this.router.events.subscribe((event) => {
            /*
            if (event instanceof NavigationStart) {
                if (this.route.snapshot.data['hasLeftNav']) {
                    this.hasLeftNav = true;
                }
            }
            */
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0)
            }
        });
        // Now that the core data has loaded, let's trigger the event that the
        // pre-bootstrap loading screen is listening for. This will initiate
        // the teardown of the loading screen.
        this.domEvents.triggerOnDocument("appready");
    }

}
