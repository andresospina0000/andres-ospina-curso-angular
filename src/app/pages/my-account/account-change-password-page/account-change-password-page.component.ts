import { PATH_MY_ACCOUNT_PAGES } from './../../../commons/config/path-pages';
import jwtDecode, { IToken } from 'jwt-decode'
import { UserApiService } from './../../../commons/services/api/user/user-api.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRequestChangePassword } from 'src/app/commons/services/api/user/user-api-model.interface';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { PATH_BUY_PAGES } from 'src/app/commons/config/path-pages';
import { DataUserService } from 'src/app/commons/services/local/data-user.service';

@Component({
	selector: 'app-account-change-password-page',
	templateUrl: './account-change-password-page.component.html',
	styleUrls: ['./account-change-password-page.component.scss']
})
export class AccountChangePasswordPageComponent {

  formGroup!: FormGroup;

	constructor(
		private _userService: UserApiService,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _snotifyService: SnotifyService,
    private _dataUserService: DataUserService
	) {
    this._loadFormGroup();
  }

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			oldPassword: [null, Validators.required],
			newPassword: [null, Validators.required]
		});
	}

	get oldPasswordField(): AbstractControl {
		return this.formGroup.get('oldPassword')!;
	}

	get newPasswordField(): AbstractControl {
		return this.formGroup.get('newPassword')!;
	}

	changePassword(): void {
		if (this.formGroup.invalid) {
			return;
		}

    this.formGroup.disable();
		this._snotifyService.confirm('Estas seguro de cambiar la contraseña actual?',
			{
				position: SnotifyPosition.centerCenter,
				buttons: [
					{
						text: 'Aceptar',
						bold: true,
						action: (toast) => {
							this._snotifyService.remove(toast.id);
							this._changePassword();
              this._resetForm();
						}
					},
					{
						text: 'Cancelar'
					}
				]
    });
	}

	private _changePassword(): void {
		const request = this._getRequest();

		this._userService.changePassword(request).subscribe({
      next: (response) => {
        if (response) this._snotifyService.info('La contraseña se cambio exitosamente!');
        this._router.navigateByUrl(PATH_MY_ACCOUNT_PAGES.changePassword.withSlash)
      },
      error: () => {
        this._snotifyService.error('Hubo un problema al actualizar tu contraseña.');
        this._resetForm();
      }
    });
	}

	private _getRequest(): IRequestChangePassword {
		return {
			email: this._dataUserService.getUserEmail(),
			oldPassword: this.oldPasswordField.value as string,
			newPassword: this.newPasswordField.value as string
		};
	}

  private _resetForm(): void {
		this.formGroup.enable();
    this.formGroup.reset();
	}

}
