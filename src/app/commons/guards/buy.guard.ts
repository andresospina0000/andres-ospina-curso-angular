import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PATH_MAINTENANCE_PAGES } from '../config/path-pages';
import { DataUserService } from './../services/local/data-user.service';

@Injectable({ providedIn: 'root' })
export class BuyGuard implements CanActivate {
	constructor(private _dataUserService: DataUserService, private _router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this._dataUserService.isAdmin() === true) {
			this._router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
			return false;
		}
		return true;
	}
}
