import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Util } from 'src/app/commons/util/util';
import { environment } from './../../../../../environments/environment';
import { IResponse } from './../api-models-base.interface';
import { IRequestCreateSale, IResponseSaleById } from './sale-api-model.interface';

const URL_CREATE_SALE = environment.host + '/api/Sale/Create';
const URL_GET_SALE_BY_ID = environment.host + '/api/Sale/GetById';
const URL_GET_SALE_BY_USER = environment.host + '/api/Sale/GetByUser';

@Injectable({
	providedIn: 'root'
})
export class SaleApiService {
	constructor(private _httpClient: HttpClient) {}

	createSale(sale: IRequestCreateSale): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(URL_CREATE_SALE, sale);
	}

	getSaleById(id: number): Observable<IResponse<IResponseSaleById[]>> {
		const url = Util.concatPath([URL_GET_SALE_BY_ID, id]);
		return this._httpClient.get<IResponse<IResponseSaleById[]>>(url);
	}

	getSaleByUser(): Observable<IResponse<IResponseSaleById[]>> {
		return this._httpClient.get<IResponse<IResponseSaleById[]>>(URL_GET_SALE_BY_USER);
	}
}
