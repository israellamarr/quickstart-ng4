import { Component, HostBinding, Inject }    from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } 		 from '@angular/material';
import { AppSettings }                       from './config/app.settings';

@Component({
    templateUrl: './example-modal.component.html'
})
export class ExampleModalComponent {

	appSettings = AppSettings;
	formData: any;
	g_recaptcha_response: string;
    errorMessage: string;
    successMessage: string;

    constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<any>) {
    	this.formData = data.formData;
    }

    closeDialog(): void {
        this.dialogRef.close({});
    }

    handleCorrectCaptcha(event: any): void {
    	this.g_recaptcha_response = event;
    }

    onSubmit() {
        if (this.validRequest()) {
            this.submitForm();
        }
    }

    submitForm() {}

    validRequest(): boolean {
        let valid = true;
        return valid;
    }

}
