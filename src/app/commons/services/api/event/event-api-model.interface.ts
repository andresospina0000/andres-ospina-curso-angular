//#region  CREATE EVENT
export interface IRequestCreateEvent {
	title: string;
	description: string;
	date: string;
	time: string;
	ticketsQuantity: number;
	unitPrice: number;
	fileName: string;
	imageBase64: string;
	genreId: number;
	place?: string;
}
//#endregion

//#region GET LIST ALL EVENTS / GET EVENT BY GENRE ID
export interface IResponseListAllEvent {
	id: number;
	title: string;
	description: string;
	dateEvent: string;
	ticketsQuantity: number;
	unitPrice: number;
	genre: string;
	status: string;
}
//#endregion

//#region  GET EVENT BYB ID
export interface IResposeEventById {
	id: number;
	title: string;
	description: string;
	dateEvent: string;
	ticketsQuantity: number;
	unitPrice: number;
	imageUrl?: string;
	genreId: number;
	finalized: boolean;
	status: boolean;
	place: string;
}
//#endregion

//#region GET MINIMA DATA BY BENRE
export interface IResponseMinimalDataByGenre {
	id: number;
	title: string;
}
//#endregion
