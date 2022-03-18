import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { URL_LOGIN, URL_REGISTER } from '../services/api/user/user-api.service';
import { URL_HOME } from './../services/api/home/home-api.service';
import { DataUserService } from './../services/local/data-user.service';

const EXEMPTED_URLS = [URL_LOGIN, URL_REGISTER, URL_HOME];

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	constructor(private _dataUser: DataUserService, private _router: Router) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		console.log('****ApiInterceptor***');

		if (this.isExempted(request.url)) {
			return next.handle(request);
		}

		if (this._dataUser.isExpiredToken()) {
			this._router.navigateByUrl('/');
			EMPTY;
		}

		const token = this._dataUser.getToken();

		const requestClone = request.clone({
			headers: request.headers.set('Authorization', `Bearer ${token}`)
		});

		return next.handle(requestClone);
	}

	private isExempted(url: string): boolean {
		const exist = EXEMPTED_URLS.find((item) => item === url);
		return exist !== undefined;
		// if (exist) {
		// 	return true;
		// }
	}
}
