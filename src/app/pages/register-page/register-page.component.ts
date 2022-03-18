import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT_TYPE } from 'src/app/commons/util/enums';
import { PATHS_AUTH_PAGES } from './../../commons/config/path-pages';
import { IRequestRegister } from './../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from './../../commons/services/api/user/user-api.service';
import { validateFieldForm } from './../../commons/util/validate-form-util';
import { customConfirmValidator, MODEL_REGISTER_ERRORS } from './register-custom-validators';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
	constructor(private _formBuilder: FormBuilder, private _router: Router, private _userApiService: UserApiService) {
		this._loadFormGroup();
	}

	formGroup!: FormGroup;

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			firstName: [null, Validators.required],
			lastName: [null, Validators.required],
			typeDocument: [null, Validators.required],
			documentNumber: [null, [Validators.required, this._validateDocument()]],
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required, customConfirmValidator('password')]],
			confirmPassword: [null, [Validators.required, customConfirmValidator('confirmPassword')]],
			age: null
		});
	}

	clickRegister(): void {
		if (this.formGroup.invalid) {
			return;
		}

		this._userApiService.register(this._getRequest()).subscribe((response) => {
			if (response) {
				void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			}
		});
	}

	private _getRequest(): IRequestRegister {
		return {
			firstName: this.firtsField.value as string,
			lastName: this.lastNameField.value as string,
			typeDocument: this.typeDocumentField.value as number,
			documentNumber: this.documentNumberField.value as string,
			email: this.emailField.value as string,
			password: this.passwordField.value as string,
			confirmPassword: this.passwordField.value as string,
			age: this.ageField.value ? (this.ageField.value as number) : undefined
		};
	}

	getErrors(controlName: string): string[] {
		const control = this.formGroup.get(controlName);
		if (control && control.invalid && control.touched) {
			return validateFieldForm(MODEL_REGISTER_ERRORS, controlName, control);
		}
		return [];
	}

	private _validateDocument(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const nrDocument = control.value as string;
			const validatorError: ValidationErrors = {};

			if (nrDocument && this.typeDocumentField) {
				const typeDocument = this.typeDocumentField.value as number;

				// if (typeDocument === DOCUMENT_TYPE.DNI && (nrDocument.length < 8 || nrDocument.length > 8)) {
				if (typeDocument === DOCUMENT_TYPE.DNI && nrDocument.length !== 8) {
					validatorError['dnierror'] = true;
					return validatorError;
					// return { dnierror: true };
				}
			}

			return validatorError;
		};
	}

	get firtsField(): AbstractControl {
		return this.formGroup.get('firstName')!;
	}

	get lastNameField(): AbstractControl {
		return this.formGroup.get('lastName')!;
	}

	get typeDocumentField(): AbstractControl {
		return this.formGroup.get('typeDocument')!;
	}

	get documentNumberField(): AbstractControl {
		return this.formGroup.get('documentNumber')!;
	}

	get emailField(): AbstractControl {
		return this.formGroup.get('email')!;
	}

	get passwordField(): AbstractControl {
		return this.formGroup.get('password')!;
	}

	get confirmPasswordField(): AbstractControl {
		return this.formGroup.get('confirmPassword')!;
	}

	get ageField(): AbstractControl {
		return this.formGroup.get('age')!;
	}
}
