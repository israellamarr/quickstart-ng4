import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { SharedModule }             from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule }           from '@angular/material';

import { LoginComponent }                   from './login.component';
import { RequestPasswordResetComponent }    from './request-password-reset/request-password-reset.component';
import { UpdatePasswordComponent }          from './update-password/update-password.component';

import { LoginRoutingModule }               from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    RequestPasswordResetComponent,
    UpdatePasswordComponent
  ]
})
export class LoginModule {}
