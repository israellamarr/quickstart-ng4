import { Component, OnInit }        from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { MaterialModule }           from '@angular/material';
import {
    MdSnackBarModule,
    MdSnackBar,
    MdInputModule
} from '@angular/material';

import { AuthenticationService }    from '../../core/auth/authentication.service';

@Component({
    templateUrl: './request-password-reset.component.html',
    styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent implements OnInit {

    passwordResetForm: FormGroup;
    active = true;
    formSubmitted = false;

    constructor(public authenticationService: AuthenticationService, public router: Router, private snackBar: MdSnackBar) { }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.passwordResetForm = new FormGroup ({
            email_address: new FormControl("", Validators.required)
        });
        this.passwordResetForm.valueChanges.subscribe(data => this.onValueChanged());
        this.onValueChanged(); // (re)set validation messages now
    }

    onSubmit() {
        this.formSubmitted = true;
        this.validatePasswordForm();
        if (this.passwordResetForm.status == 'VALID') {
            this.sendPasswordReset();
        }
    }

    sendPasswordReset() {
        let email_address = this.passwordResetForm.value.email_address;
        this.authenticationService.sendPasswordReset(email_address).subscribe(dataResult => {
            console.log(dataResult);
            if (dataResult.success) {
                this.snackBar.open(dataResult.message, '', {
                    duration: 2000,
                    extraClasses: ['snack-bar-success']
                });
                this.router.navigate(['/login']);
            } else {
                this.snackBar.open(dataResult.message, '', {
                    duration: 2000,
                    extraClasses: ['snack-bar-warning']
                });
            }
        });
    }

    onValueChanged() {
        this.validatePasswordForm();
    }

    validatePasswordForm() {
        if ( ! this.passwordResetForm) {
            return;
        }
        if ( ! this.formSubmitted) {
            return;
        } else {
            const form = this.passwordResetForm;
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
        'email_address': ''
    };

    validationMessages = {
        'email_address': {
            'required':      'Email is required.'
        }
    };

}
