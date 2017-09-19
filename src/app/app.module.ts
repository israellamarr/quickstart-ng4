import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { CoreModule }               from './modules/core/core.module';
import { SharedModule }             from './modules/shared/shared.module';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'

import { DropzoneModule, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Components
import { AppComponent }             from './app.component';

// Application Routing
import { AppRoutingModule }         from './app-routing.module';

import { PageNotFoundComponent }    from './not-found.component'; // Page not found component

// My Modules
import { LoginModule }              from './modules/login/login.module'; // Login Module

const DROPZONE_CONFIG: DropzoneConfigInterface = {

};

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        DropzoneModule.forRoot(DROPZONE_CONFIG),
        LoginModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
