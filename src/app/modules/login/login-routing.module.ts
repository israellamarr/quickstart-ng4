import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { LoginComponent }           from './login.component';
import { RequestPasswordResetComponent }   from './request-password-reset/request-password-reset.component';
import { UpdatePasswordComponent }   from './update-password/update-password.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'request-password-reset', component: RequestPasswordResetComponent },
  { path: 'update-password/:user_code', component: UpdatePasswordComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {}
