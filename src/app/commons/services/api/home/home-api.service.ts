import { Observable } from 'rxjs';
import { IResponseHome } from './home-api.interface';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const URL_HOME = environment.host + '/Home';

@Injectable({ providedIn: 'root' })
export class HomeApiService {
	constructor(private _httpClient: HttpClient) {}

	getHome(): Observable<IResponseHome> {
		return this._httpClient.get<IResponseHome>(URL_HOME);
	}
}
