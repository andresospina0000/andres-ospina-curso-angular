import { IResponse } from '../api-models-base.interface';

export interface IResponseHome {
	genres: IResponse<IHomeGenres[]>;
	events: IResponse<IHomeEvents[]>;
}

export interface IHomeEvents {
	id: number;
	title: string;
	description: string;
	dateEvent: string;
	ticketsQuantity: number;
	unitPrice: number;
	genre: string;
	status: string;
	imageUrl: string;
	place?: any;
}

export interface IHomeGenres {
	description: string;
	id: number;
	status: boolean;
}
