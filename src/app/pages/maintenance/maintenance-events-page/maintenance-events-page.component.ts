import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import {
	IRequestCreateEvent,
	IResponseListAllEvent
} from './../../../commons/services/api/event/event-api-model.interface';
import { EventApiService } from './../../../commons/services/api/event/event-api.service';
import { IResponseGenre } from './../../../commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from './../../../commons/services/api/genre/genre-api.service';
import { CRUD_METHOD, STATUS_CRUD } from './../../../commons/util/enums';

@Component({
	selector: 'app-maintenance-events-page',
	templateUrl: './maintenance-events-page.component.html',
	styleUrls: ['./maintenance-events-page.component.scss']
})
export class MaintenanceEventsPageComponent implements OnInit {
	constructor(
		private _formBuilder: FormBuilder,
		private _eventApiService: EventApiService,
		private _genreApiService: GenreApiService,
		private _snotifyService: SnotifyService,
		private _datePipe: DatePipe
	) {
		this._loadFormGroup();
	}

	displayedColumns: string[] = [
		'title',
		'description',
		'dateEvent',
		'ticketsQuantity',
		'price',
		'genre',
		'status',
		'action'
	];

	dataSource = new MatTableDataSource<IResponseListAllEvent>();

	formGroup!: FormGroup;
	disabledButtonSave = false;
	listGenres: IResponseGenre[] = [];
	indexTabSaveEvent = 0;

	private _crudMethod = CRUD_METHOD.SAVE;

	canDeactivate(): boolean {
		const exitData = this.titleField.value !== undefined && this.titleField.value !== null;

		if (exitData) {
			if (confirm('¿Estas seguro que deseas salir?')) {
				return true;
			}
			return false;
		}

		return true;
	}

	ngOnInit(): void {
		this._loadEvents();
		this._loadGenres();
	}

	clickSave(): void {
		if (this.formGroup.invalid) {
			return;
		}

		this.disabledButtonSave = true;
		this.formGroup.disable();

		const base64 = (this.imageField.value as string).split(',')[1];

		const sendEvent: IRequestCreateEvent = {
			imageBase64: base64,
			title: this.titleField.value as string,
			description: this.descriptionField.value as string,
			date: this._datePipe.transform(this.dateField.value as Date, 'yyyy-MM-dd')!,
			time: this.hourField.value as string,
			ticketsQuantity: this.ticketsQuantityField.value as number,
			unitPrice: this.priceField.value as number,
			genreId: this.genreField.value as number,
			fileName: this.fileNameField.value as string,
			place: this.placeField.value as string
		};

		this._snotifyService.confirm('¿Desea guardar la información?', {
			position: SnotifyPosition.rightCenter,
			buttons: [
				{
					text: 'SI',
					bold: true,
					action: (toast) => {
						this._snotifyService.remove(toast.id);
						if (this._crudMethod === CRUD_METHOD.UPDATE) {
							this._update(sendEvent);
							return;
						}

						this._save(sendEvent);
					}
				},
				{
					text: 'CANCELAR',
					action: () => {
						this._acctionsSucces();
					}
				}
			]
		});
	}

	private _save(event: IRequestCreateEvent) {
		this._eventApiService.createEvent(event).subscribe({
			next: (response) => {
				if (response && response.success) {
					this.formGroup.reset();
					this._acctionsSucces();
					this._loadEvents();
					this._snotifyService.info('El registro se guardo sin problemas');
				}
			},
			error: () => {
				this._acctionsSucces();
			}
		});
	}

	private _update(event: IRequestCreateEvent) {
		this._eventApiService.updateEvent(this.idField.value as number, event).subscribe({
			next: (response) => {
				if (response && response.success) {
					this._loadEvents();
					this._acctionsSucces();
					this._snotifyService.info('El registro se actualizo sin problemas');
				}
			},
			error: () => {
				this._acctionsSucces();
			}
		});
	}

	private _acctionsSucces(): void {
		this.disabledButtonSave = false;
		this.formGroup.enable();
	}

	clickDelete(id: number): void {
		this._snotifyService.confirm('¿Está seguro de eliminar el registro?', {
			position: SnotifyPosition.rightCenter,
			buttons: [
				{
					text: 'SI',
					bold: true,
					action: (toast) => {
						this._snotifyService.remove(toast.id);
						this._eventApiService.deletEvent(id).subscribe((response) => {
							if (response && response.success) {
								this._snotifyService.info('El registro ha sido eliminado');
							}
						});
					}
				},
				{
					text: 'CANCELAR'
				}
			]
		});
	}

	clickUpdate(event: IResponseListAllEvent): void {
		this._eventApiService.getEventById(event.id).subscribe((response) => {
			if (response && response.success) {
				const eventResponse = response.result;

				this.idField.setValue(eventResponse.id);
				this.titleField.setValue(eventResponse.title);
				this.descriptionField.setValue(eventResponse.description);
				this.dateField.setValue(new Date(eventResponse.dateEvent));
				this.hourField.setValue(this._datePipe.transform(eventResponse.dateEvent, 'HH:mm'));
				this.placeField.setValue(eventResponse.place);
				this.ticketsQuantityField.setValue(eventResponse.ticketsQuantity);
				this.priceField.setValue(eventResponse.unitPrice),
					this.genreField.setValue(eventResponse.genreId),
					this.statusField.setValue(eventResponse.status ? STATUS_CRUD.ACTIVO : STATUS_CRUD.INACTIVO);
				this.imageField.setValue(eventResponse.imageUrl);
			}
			this.indexTabSaveEvent = 0;
			this._crudMethod = CRUD_METHOD.UPDATE;
		});
	}

	onFileSelected(event: Event): void {
		const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
		if (htmlInput && htmlInput.files) {
			const reader = new FileReader();
			console.log(htmlInput.files);

			reader.readAsDataURL(htmlInput.files[0]);
			reader.onload = () => {
				console.log(reader.result);

				const resultImageFile = reader.result!.toString();

				this.fileNameField.setValue(htmlInput.files![0].name);
				this.imageField.setValue(resultImageFile);
			};
		}
	}

	private _loadEvents(): void {
		this._eventApiService.getAllEvents().subscribe((response) => {
			if (response && response.success) {
				this.dataSource.data = response.result;
			}
		});
	}

	private _loadGenres(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			if (response && response.result) {
				this.listGenres = response.result;
			}
		});
	}

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			id: [null],
			title: [null, [Validators.required]],
			description: [null, Validators.required],
			date: [null, [Validators.required]],
			hour: [null, Validators.required],
			ticketsQuantity: [null, Validators.required],
			price: [null, Validators.required],
			place: [null, Validators.required],
			genre: [null, Validators.required],
			status: [null, Validators.required],
			image: [null, Validators.required],
			fileName: [null]
		});
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	get idField(): AbstractControl {
		return this.formGroup.get('id')!;
	}

	get titleField(): AbstractControl {
		return this.formGroup.get('title')!;
	}

	get descriptionField(): AbstractControl {
		return this.formGroup.get('description')!;
	}

	get dateField(): AbstractControl {
		return this.formGroup.get('date')!;
	}

	get hourField(): AbstractControl {
		return this.formGroup.get('hour')!;
	}

	get ticketsQuantityField(): AbstractControl {
		return this.formGroup.get('ticketsQuantity')!;
	}

	get priceField(): AbstractControl {
		return this.formGroup.get('price')!;
	}

	get placeField(): AbstractControl {
		return this.formGroup.get('place')!;
	}

	get genreField(): AbstractControl {
		return this.formGroup.get('genre')!;
	}

	get statusField(): AbstractControl {
		return this.formGroup.get('status')!;
	}

	get imageField(): AbstractControl {
		return this.formGroup.get('image')!;
	}

	get fileNameField(): AbstractControl {
		return this.formGroup.get('fileName')!;
	}
}
