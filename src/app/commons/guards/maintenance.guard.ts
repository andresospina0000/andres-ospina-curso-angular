import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { PATH_MY_ACCOUNT_PAGES } from '../config/path-pages';
import { DataUserService } from '../services/local/data-user.service';

/**
 * Guard para paginas de mantenimiento
 */
@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate, CanActivateChild {

  constructor(private _dataUserService: DataUserService, private _router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.validIsAdmin();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validIsAdmin();
  }

  /**
   * Valida si el token esta expirado y si el usuario es admin para admitir ingreso a paginas de mantenimiento
  */
  private validIsAdmin(): boolean{

    const isAdmin = this._dataUserService.isAdmin();

    if (isAdmin) {
			return true;
		}

    this._router.navigateByUrl(PATH_MY_ACCOUNT_PAGES.changePassword.withSlash);
		return true;
	}
}
