import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { CoreModule }               from './modules/core/core.module';
import { SharedModule }             from './modules/shared/shared.module';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { ReCaptchaModule }          from 'angular2-recaptcha';


// Components
import { AppComponent }             from './app.component';
import { HomeComponent }            from './home.component';

// Modals
import { ExampleModalComponent }     from './example-modal.component';

// Application Routing
import { AppRoutingModule }         from './app-routing.module';

import { PageNotFoundComponent }    from './not-found.component'; // Page not found component

// My Modules

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        ReCaptchaModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ExampleModalComponent,
        PageNotFoundComponent
    ],
    entryComponents: [ ExampleModalComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
