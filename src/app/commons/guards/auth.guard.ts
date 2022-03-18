import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../config/path-pages';
import { DataUserService } from './../services/local/data-user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(private _dataUserService: DataUserService, private _router: Router) {}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this._validaSession();
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this._validaSession();
	}

	private _validaSession(): boolean {
		const isExpiredToken = this._dataUserService.isExpiredToken();
		if (isExpiredToken) {
			this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return false;
		}

		return true;
	}
}
