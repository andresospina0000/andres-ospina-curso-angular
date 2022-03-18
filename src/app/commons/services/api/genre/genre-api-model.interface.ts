//#region  GET GENRES / GET GENRE
export interface IResponseGenre {
	description: string;
	id: number;
	status: boolean;
}

export interface IRequestGenre {
	description: string;
	status: boolean;
}

//#endregion

export interface IGenreStatus{
  description: string;
  status: boolean;
}
