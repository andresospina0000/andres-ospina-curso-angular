import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';
import { DataUserService } from './../services/local/data-user.service';

@Injectable({ providedIn: 'root' })
export class NameGuard implements CanActivateChild {
	constructor(private _dataUserService: DataUserService, private _router: Router) {}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
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
