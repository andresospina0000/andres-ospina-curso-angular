import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { Util } from './../../../util/util';
import { IResponse } from './../api-models-base.interface';
import { IResponseGenre, IRequestGenre } from './genre-api-model.interface';

const URL_GENRE = environment.host + '/api/Genre';

@Injectable({
	providedIn: 'root'
})
export class GenreApiService {
	constructor(private _httpClient: HttpClient) {}

	createGenre(description: string): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(URL_GENRE, { description });
	}

	getGenres(): Observable<IResponse<IResponseGenre[]>> {
		return this._httpClient.get<IResponse<IResponseGenre[]>>(URL_GENRE);
	}

	getGenre(id: number): Observable<IResponse<IResponseGenre>> {
		return this._httpClient.get<IResponse<IResponseGenre>>(Util.concatPath([URL_GENRE, id]));
	}

	updateGenre(id: number, genre: Partial<IRequestGenre>): Observable<IResponse<number>> {
		const url = Util.concatPath([URL_GENRE, id]);
		return this._httpClient.put<IResponse<number>>(url, genre);
	}

	deleteGenre(id: number): Observable<IResponse<number>> {
		const url = URL_GENRE + '/' + id;
		return this._httpClient.delete<IResponse<number>>(url);
	}
}
