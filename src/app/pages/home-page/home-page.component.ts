import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeApiService } from 'src/app/commons/services/api/home/home-api.service';
import { CardEventComponent } from './../../commons/components/card-event/card-event.component';
import { PATH_BUY_PAGES } from './../../commons/config/path-pages';
import { ICardEvent } from './../../commons/models/components.interface';
import { IHomeEvents, IHomeGenres } from './../../commons/services/api/home/home-api.interface';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {
	@ViewChild('cardEvent') cardEvent: CardEventComponent | undefined;

	constructor(private _homeApiService: HomeApiService, private _router: Router) {}

	listGenres: IHomeGenres[] = [];
	listEvents: ICardEvent[] = [];

	ngOnInit(): void {
		this._loadHome();
	}

	ngAfterViewInit(): void {
		// console.log('***ngAfterViewInit***');
		setTimeout(() => {
			console.log(this.cardEvent);
		}, 800);
	}

	clickCard(item: ICardEvent): void {
		console.log('******HomePageComponent****');

		// this._router.navigate([PATH_BUY_PAGES.buyPage.withSlash], { state: item });
		this._router.navigate([PATH_BUY_PAGES.buyPage.withSlash], { state: { event: item } });
	}

	private _loadHome(): void {
		this._homeApiService.getHome().subscribe((response) => {
			this.listGenres = response.genres.result;
			this._castEventsResponse(response.events.result);
		});
	}

	private _castEventsResponse(listEventResponse: IHomeEvents[]) {
		this.listEvents = listEventResponse.map((item) => {
			const event: ICardEvent = {
				idEvent: item.id,
				urlImage: item.imageUrl,
				title: item.title,
				description: item.description,
				date: item.dateEvent,
				hour: '',
				price: item.unitPrice,
				genre: item.genre,
				place: ''
			};

			return event;
		});
	}
}
