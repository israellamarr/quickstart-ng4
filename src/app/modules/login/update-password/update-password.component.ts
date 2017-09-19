import { Component, OnInit }        from '@angular/core';
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    Router,
    NavigationExtras,
    ActivatedRoute
} from '@angular/router';

import { MaterialModule }           from '@angular/material';
import {
    MdSnackBarModule,
    MdSnackBar,
    MdInputModule
} from '@angular/material';

import { AuthenticationService }    from '../../core/auth/authentication.service';

@Component({
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

    passwordUpdateForm: FormGroup;
    active = true;
    formSubmitted = false;
    user_code: string;

    constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute, private snackBar: MdSnackBar) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let user_code = params['user_code'];
            if (user_code) {
                this.user_code = user_code;
            } else {
                this.router.navigate(['/login']);
            }
        });
        this.buildForm();
    }

    buildForm(): void {
        this.passwordUpdateForm = new FormGroup ({
            password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
            password_confirmation: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
        });
        this.passwordUpdateForm.valueChanges.subscribe(data => this.onValueChanged());
        this.onValueChanged(); // (re)set validation messages now
    }

    onSubmit() {
        this.formSubmitted = true;
        this.validatePasswordForm();
        if (this.passwordUpdateForm.status == 'VALID') {

            if (this.passwordUpdateForm.value.password != this.passwordUpdateForm.value.password_confirmation) {
                this.snackBar.open('The passwords do not match.', '', {
                    duration: 2000,
                    extraClasses: ['snack-bar-error']
                });
            } else {
                this.updatePassword();
            }

        }
    }

    updatePassword() {
        let user_code       = this.user_code;
        let password        = this.passwordUpdateForm.value.password;
        this.authenticationService.updatePassword(user_code, password).subscribe(dataResult => {
            if (dataResult.success) {
                this.snackBar.open(dataResult.message, '', {
                    duration: 2000,
                    extraClasses: ['snack-bar-success']
                });
                this.router.navigate(['/login']);
            } else {
                this.snackBar.open(dataResult.message, '', {
                    duration: 2000,
                    extraClasses: ['snack-bar-error']
                });
            }
        });
    }

    onValueChanged() {
        this.validatePasswordForm();
    }

    validatePasswordForm() {
        if ( ! this.passwordUpdateForm) {
            return;
        }
        if ( ! this.formSubmitted) {
            return;
        } else {
            const form = this.passwordUpdateForm;
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
        'password': '',
        'password_confirmation': ''
    };

    validationMessages = {
        'password': {
            'required': 'Password is required.',
            'minlength': 'Password must be at least 8 characters long.',
            'maxlength': 'Password cannot be more than 32 characters long.'
        },
        'password_confirmation': {
            'required': 'Password confirmation is required.',
            'minlength': 'Password must be at least 8 characters long.',
            'maxlength': 'Password cannot be more than 32 characters long.'
        }
    };

}
