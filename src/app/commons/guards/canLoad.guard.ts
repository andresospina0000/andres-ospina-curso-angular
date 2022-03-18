import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CanLoadGuard implements CanLoad {
	constructor() {}

	canLoad(route: Route): boolean {
		console.log('*******CanLoadGuard*******');
		return true;
	}
}
