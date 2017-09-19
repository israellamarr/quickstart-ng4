import { Component, OnInit }        from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,
         NavigationExtras }         from '@angular/router';
import { MaterialModule }           from '@angular/material';
import {
    MdSnackBarModule,
    MdSnackBar,
    MdInputModule
} from '@angular/material';

import { AuthenticationService }    from '../core/auth/authentication.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    active = true;
    formSubmitted = false;

    constructor(private snackBar: MdSnackBar, private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit(): void {
        this.signOut();
        this.buildForm();
    }

    buildForm(): void {
        this.loginForm = new FormGroup ({
            email_address: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required)
        });
        this.loginForm.valueChanges.subscribe(data => this.onValueChanged());
        this.onValueChanged(); // (re)set validation messages now
    }

    login() {
        let email_address   = this.loginForm.value.email_address;
        let password        = this.loginForm.value.password;
        this.authenticationService.login(email_address, password).subscribe(dataResult => {
            if (dataResult.success) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/account/dashboard';
                // Set our navigation extras object
                // that passes on our global query params and fragment
                let navigationExtras: NavigationExtras = {
                  preserveQueryParams: true,
                  preserveFragment: true
                };
                // Redirect the user
                this.router.navigate([redirect], navigationExtras);
            } else {
                this.snackBar.open(dataResult.message, '', {
                    duration: 2000,
                    extraClasses: ['snack-bar-warning']
                });
            }
        });
    }

    signOut() {
        this.authenticationService.signOut().subscribe(() => this.router.navigate(['/login']));
    }

    onSubmit() {
        this.formSubmitted = true;
        this.validateLoginForm();
        if (this.loginForm.status == 'VALID') {
            this.login();
        }
    }

    onValueChanged() {
        this.validateLoginForm();
    }

    validateLoginForm() {
        if ( ! this.loginForm) {
            return;
        }
        if ( ! this.formSubmitted) {
            return;
        } else {
            const form = this.loginForm;
            for (const field in this.formErrors) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                //if (control && control.dirty && !control.valid) {
                if (control && ! control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }

    formErrors = {
        'email_address': '',
        'password': ''
    };

    validationMessages = {
        'email_address': {
            'required':      'Email is required.'
        },
        'password': {
            'required':      'Password is required.'
        }
    };

}
