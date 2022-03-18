import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { IResponse } from './../api-models-base.interface';
import { IResponseReportSale } from './reports-api-model.interface';

const URL_REPORT_SALE = environment.host + '/Report/Sales';

@Injectable({ providedIn: 'root' })
export class ReportsApiService {
	constructor(private _httpClient: HttpClient) {}

	getDataSale(dateInit: string, dateEnd: string, genreId?: number): Observable<IResponse<IResponseReportSale[]>> {
		let url = URL_REPORT_SALE;
		if (genreId) {
			url = url + '?genreId=' + genreId + '&dateInit=' + dateInit + '&dateEnd=' + dateEnd;
		} else {
			url = url + '?dateInit=' + dateInit + '&dateEnd=' + dateEnd;
		}
		return this._httpClient.get<IResponse<IResponseReportSale[]>>(url);
	}
}
