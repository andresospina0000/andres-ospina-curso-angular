export class Util {
	/**
	 * Esta función se encargara de concatenar los valores del array 'values' con el separador slash "/"
	 * ejemplo:
	 *
	 * ['value', 1, 8] -->  output: "value/1/8"
	 *
	 * @param values
	 * @returns cadena de texto concatenado
	 */
	static concatPath(values: unknown[]): string {
		return values.join('/');
	}
}
