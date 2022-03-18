import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../api-models-base.interface';
import { environment } from './../../../../../environments/environment';
import {
	IRequestChangePassword,
	IRequestLogin,
	IRequestRegister,
	IRequestResetPassword,
	IResponseLogin
} from './user-api-model.interface';

export const URL_LOGIN = environment.host + '/api/User/Login';
export const URL_REGISTER = environment.host + '/api/User/Register';
const URL_SEND_TOKEN_RESET_PASSWORD = environment.host + '/api/User/SendTokenToResetPassword';
const URL_RESET_PASSWORD = environment.host + '/api/User/ResetPassword';
const URL_CHANGE_PASSWORD = environment.host + '/api/User/ChangePassword';

@Injectable({ providedIn: 'root' })
export class UserApiService {
	constructor(private _httpClient: HttpClient) {}

	login(request: IRequestLogin): Observable<IResponseLogin> {
		return this._httpClient.post<IResponseLogin>(URL_LOGIN, request);
	}

	register(request: IRequestRegister): Observable<IResponse<string>> {
		return this._httpClient.post<IResponse<string>>(URL_REGISTER, request);
	}

	sendTokenToResetPassword(email: string): Observable<IResponse<string>> {
		return this._httpClient.post<IResponse<string>>(URL_SEND_TOKEN_RESET_PASSWORD, { email });
	}

	resetPassword(request: IRequestResetPassword): Observable<IResponse<string>> {
		return this._httpClient.post<IResponse<string>>(URL_RESET_PASSWORD, request);
	}

	changePassword(request: IRequestChangePassword): Observable<IResponse> {
		return this._httpClient.post<IResponse>(URL_CHANGE_PASSWORD, request);
	}
}
