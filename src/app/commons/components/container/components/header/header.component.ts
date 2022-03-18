import { Component, OnInit } from '@angular/core';
import { PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';
import { ChannelHeaderService } from './../../../../services/local/channel-header.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	constructor(private _channelHeaderService: ChannelHeaderService) {}
	showUser = false;
	loginPath = PATHS_AUTH_PAGES.loginPage.withSlash;
	registerPath = PATHS_AUTH_PAGES.registerPage.withSlash;

	ngOnInit(): void {
		this._channelHeaderService.channelHeader$.subscribe((value) => {
			this.showUser = value;
		});
	}
}
