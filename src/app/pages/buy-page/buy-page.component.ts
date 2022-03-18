import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { mergeMap } from 'rxjs';
import { PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';
import { ICardEvent } from './../../commons/models/components.interface';
import { IRequestCreateSale, IResponseSaleById } from './../../commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from './../../commons/services/api/sale/sale-api.service';
import { DataUserService } from './../../commons/services/local/data-user.service';

@Component({
	selector: 'app-buy-page',
	templateUrl: './buy-page.component.html',
	styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent {
	constructor(
		private _saleApiService: SaleApiService,
		private _router: Router,
		private _dataUserService: DataUserService,
		private _snotifyService: SnotifyService
	) {
		this._catureData();
	}

	statusBuy: statusBuy = 'INFO';
	cardEvent: ICardEvent | undefined;
	numberEntries = 0;
	voucher: IResponseSaleById | undefined;
	total = 0;

	inputCalculate(): void {
		this.total = this.numberEntries * this.cardEvent!.price;
	}

	clickBuy(statusBuy: statusBuy): void {
		if (this._dataUserService.isExpiredToken()) {
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return;
		}

		if (statusBuy === 'VOUCHER') {
			this._saveBuy();
		}

		this.statusBuy = statusBuy;
	}

	private _saveBuy(): void {
		const sendBuy: IRequestCreateSale = {
			eventId: this.cardEvent!.idEvent,
			quantity: this.numberEntries,
			unitPrice: this.cardEvent!.price
		};

		// SE PUEDE LLAMAR SERVICIOS ANIDADOS DE LA SIGUIENTE MANERA: (PERO ES MALA PRACTICA)
		// this._saleApiService.createSale(sendBuy).subscribe((response) => {
		// 	this._saleApiService.getSaleById(response.result).subscribe((response2) => {
		//   });
		// });

		this._saleApiService
			.createSale(sendBuy)
			.pipe(
				mergeMap((response) => {
					return this._saleApiService.getSaleById(response.result);
				})
			)
			.subscribe((voucher) => {
				if (voucher && voucher.success) {
					this.voucher = voucher.result[0];
					this.statusBuy = 'VOUCHER';
					this._snotifyService.info('Su compra se ha realizado con exito, gracias.', {
						position: SnotifyPosition.rightTop
					});
				}
			});
	}

	private _catureData(): void {
		const navigation = this._router.getCurrentNavigation();
		if (navigation && navigation.extras.state) {
			// this.cardEvent = navigation.extras.state as ICardEvent;
			this.cardEvent = navigation.extras.state['event'];
		}

		if (!this.cardEvent) {
			this._router.navigateByUrl('/');
		}
	}
}

type statusBuy = 'INFO' | 'BUY' | 'VOUCHER';
