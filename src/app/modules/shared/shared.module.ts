import { NgModule }                         from '@angular/core';
import { HttpModule } 						from '@angular/http';
import { CommonModule }                     from '@angular/common';
import { RouterModule, Routes }  		    from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSettings }                      from '../../config/app.settings';
import { MaterialModule, MdNativeDateModule } from '@angular/material';

import { MainNavComponent }                 from './layout/main-nav.component';
import { MainFooterComponent }              from './layout/main-footer.component';

import { Loader }                           from './loader/loader.component';

// Services
import { UtilityService }                   from './utility.service';

@NgModule({
  imports:      [ CommonModule, HttpModule, RouterModule, MaterialModule, MdNativeDateModule, FormsModule, ReactiveFormsModule ],
  declarations: [ MainFooterComponent, MainNavComponent, Loader ],
  providers:    [ UtilityService ],
  exports:      [ CommonModule, RouterModule, ReactiveFormsModule, MaterialModule, MdNativeDateModule, MainFooterComponent, MainNavComponent, Loader ]
})
export class SharedModule { }
