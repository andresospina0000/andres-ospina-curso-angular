import { PATH_MY_ACCOUNT_PAGES } from './../../commons/config/path-pages';
import { Component } from '@angular/core';
import { PATH_MAINTENANCE_PAGES } from 'src/app/commons/config/path-pages';
import { ICardMenu } from 'src/app/commons/models/components.interface';

@Component({
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  menuUser: ICardMenu[] = [
		{
			title: 'MIS COMPRAS',
			nameImage: 'buys.png',
			active: true,
			path: PATH_MY_ACCOUNT_PAGES.myShopping.withSlash
		},
		{
			title: 'CAMBIAR CONTRASEÑA',
			nameImage: 'change-password.png',
			active: false,
			path: PATH_MY_ACCOUNT_PAGES.changePassword.withSlash
    }
	];
}
