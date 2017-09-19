import { Component, OnInit, HostBinding, Input, Output, EventEmitter }   from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { MaterialModule } from '@angular/material';

import { fadeOutOnly } from '../animations/animations';

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
    animations: [
        fadeOutOnly
    ]
})
export class Loader implements OnInit {

    @Input('contentLoaded') contentLoaded: boolean;
    @Output() loadingComplete: EventEmitter<any> = new EventEmitter<any>();
    loadingCounter: number = .25;
    loadingTimer: any;

    constructor() { }

    ngOnInit(): void {
        this.startLoadingTimer();
    }

    startLoadingTimer() {
        this.loadingTimer = setInterval(() => {
            //console.log('counter running');
            if (this.loadingCounter < 1) {
                if (this.loadingCounter == .75) {
                    if (this.contentLoaded) {
                        //console.log('increment counter, content loaded.');
                        this.loadingCounter += .25;
                    }
                } else {
                    //console.log('increment counter');
                    this.loadingCounter += .25;
                }
            } else {
                //console.log('interval cleared...');
                clearInterval(this.loadingTimer);
                this.loadingComplete.emit(true);
            }
        }, 400);
    }

}
