export interface IAtribute {
	formControlName: string; //password
	validators: IValidator[]; //[{name: 'required', message:'la casilla es requerida'},{name: 'validateUpperCase', message:'Se necesita una mayuscula'} ]
}

export interface IValidator {
	name: string;
	message: string;
}
