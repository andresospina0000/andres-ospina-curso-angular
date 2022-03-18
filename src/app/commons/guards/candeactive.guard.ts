import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { MaintenanceEventsPageComponent } from 'src/app/pages/maintenance/maintenance-events-page/maintenance-events-page.component';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard implements CanDeactivate<MaintenanceEventsPageComponent> {
	canDeactivate(
		component: MaintenanceEventsPageComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot
	): boolean {
		return component.canDeactivate ? component.canDeactivate() : true;
	}
}
