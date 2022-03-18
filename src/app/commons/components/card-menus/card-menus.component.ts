import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ICardMenu } from './../../models/components.interface';

@Component({
	selector: 'app-card-menus',
	templateUrl: './card-menus.component.html',
	styleUrls: ['./card-menus.component.scss']
})
export class CardMenusComponent {
	@Input() menus: ICardMenu[] = [];

	constructor(private _router: Router) {
		this._subscribeEventsNavigation();
	}

	clickMenu(menu: ICardMenu): void {
		// this._activeMenu(menu);
	}

	private _subscribeEventsNavigation(): void {
		this._router.events.pipe(filter((value) => value instanceof NavigationEnd)).subscribe((event) => {
			setTimeout(() => {
				const navigation = event as NavigationEnd;
				this._selectMenu(navigation.url);
			}, 10);
		});
	}

	private _selectMenu(pathNavigation: string): void {
		const menu = this.menus.find((item) => item.path === pathNavigation);
		if (menu) {
			this._activeMenu(menu);
		}
	}

	private _activeMenu(menu: ICardMenu): void {
		this.menus.forEach((item) => (item.active = false));
		menu.active = true;
	}
}
