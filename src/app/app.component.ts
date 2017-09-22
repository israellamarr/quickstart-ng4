import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { DOMEvents } from "./modules/core/shared/dom-events"; // _IH - for app loading screen

import { fadeAndHide } from "./modules/shared/animations/animations";
import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DOMEvents ]
})
export class AppComponent implements OnInit {
    
    title = 'Runskip';
    hasLeftNav = false;

    constructor(public router: Router, public route: ActivatedRoute, public domEvents: DOMEvents) { }

    ngOnInit(): void {
        // this little piece of code scrolls the user to the top of the screen when they navigate to a new page - the expected behaviour
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (this.router.url.indexOf("/about#") === -1 ) {
                    window.scrollTo(0, 0);
                }
            }
        });
        this.domEvents.triggerOnDocument("appready");
    }

}
