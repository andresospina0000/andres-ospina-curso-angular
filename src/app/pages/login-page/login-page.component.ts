import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KEYS_WEB_STORAGE } from 'src/app/commons/util/enums';
import { PATH_MAINTENANCE_PAGES, PATH_MY_ACCOUNT_PAGES } from './../../commons/config/path-pages';
import { IDataUser } from './../../commons/models/data-user';
import { IResponseLogin } from './../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from './../../commons/services/api/user/user-api.service';
import { ChannelHeaderService } from './../../commons/services/local/channel-header.service';
import { SessionStorageService } from './../../commons/services/local/storage/storage.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
	constructor(
		private _router: Router,
		private _channelHeaderService: ChannelHeaderService,
		private _formBuilder: FormBuilder,
		private _userApiService: UserApiService,
		private _sessionStorageService: SessionStorageService
	) {
		this._loadFormGroup();
		// localStorage.setItem('key', JSON.stringify({ name: 'juan' }));
		// const value = localStorage.getItem('key');

		// console.log(JSON.parse(value!).name);
	}

	disabledButton = false;
	formGroup!: FormGroup;

	clickLogin(): void {
		if (this.formGroup.valid) {
			const email = this.formGroup.get('email')?.value as string;
			const password = this.formGroup.get('password')?.value as string;

			this._login(email, password);
		}
	}

	private _login(email: string, password: string): void {
		this._userApiService.login({ email, password }).subscribe({
			next: (response) => {
				this._saveDataUserAndRedirect(response);
			},
			error: () => {
				console.log('ocurrio un error en el login');
			}
		});
	}

	private _saveDataUserAndRedirect(response: IResponseLogin): void {
		const dataUser: IDataUser = {
			token: response.token,
			fullName: response.fullName,
			isAdmin: response.roles[0] === 'Administrator'
		};
		// localStorage.setItem(KEYS_WEB_STORAGE.DATA_USER, JSON.stringify(dataUser));
		this._sessionStorageService.setItem(KEYS_WEB_STORAGE.DATA_USER, dataUser);
		this._redirectUser(dataUser.isAdmin);
	}

	private _redirectUser(isAdmin: boolean): void {
		const url = isAdmin ? PATH_MAINTENANCE_PAGES.withSlash : PATH_MY_ACCOUNT_PAGES.withSlash;

		void this._router.navigateByUrl(url);
		this._channelHeaderService.showUser(true);
	}

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			email: [null, [Validators.required, Validators.email]],
			password: [null, Validators.required]
		});
	}
}
