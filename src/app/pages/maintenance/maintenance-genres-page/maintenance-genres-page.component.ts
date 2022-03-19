import { IGenreStatus, IRequestGenre } from './../../../commons/services/api/genre/genre-api-model.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { IResponseGenre } from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from 'src/app/commons/services/api/genre/genre-api.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUD_METHOD, STATUS_CRUD } from './../../../commons/util/enums';

@Component({
  selector: 'app-maintenance-genres-page',
  templateUrl: './maintenance-genres-page.component.html',
  styleUrls: ['./maintenance-genres-page.component.scss']
})
export class MaintenanceGenresPageComponent implements OnInit {

  formGroup!: FormGroup;
  disabledButtonSave = false;
  listGenres: IResponseGenre[] = [];
  dataSource = new MatTableDataSource<IResponseGenre>();
  private _crudMethod = CRUD_METHOD.SAVE;
  indexTabSaveEvent = 0;

  displayedColumns: string[] = [
		'description',
		'status',
    'action'
	];

  readonly listGenresStatus:  IGenreStatus[] = [
    {description:"Activo", status: true },
    {description:"Inactivo", status: false }
  ];

  constructor(
    private _genreApiService: GenreApiService,
    private _formBuilder: FormBuilder,
    private _snotifyService: SnotifyService
    ) {
    this._loadFormGroup();
  }

  ngOnInit(): void {
    this._loadGenres();
  }

  private _loadGenres(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			if (response && response.result) {
				this.dataSource.data = response.result;
			}
		});
	}

  private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
      id: [null],
			status: [null, [Validators.required]],
			description: [null, Validators.required]
		});
	}

  clickDelete(id: number): void{

    this._snotifyService.confirm('¿Está seguro de eliminar el registro?', {
			position: SnotifyPosition.centerCenter,
			buttons: [
				{
					text: 'SI',
					bold: true,
					action: (toast) => {
						this._snotifyService.remove(toast.id);
						this._genreApiService.deleteGenre(id).subscribe((response) => {
							if (response && response.success) {
								this._snotifyService.info('El genero ha sido eliminado correctamente');
                this._loadGenres();
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

  clickUpdate(item: IResponseGenre): void{

    this._genreApiService.getGenre(item.id).subscribe((response) => {
			if (response && response.success) {
				const eventResponse = response.result;

				this.idField.setValue(eventResponse.id);
				this.descriptionField.setValue(eventResponse.description);
        this.statusField.setValue(eventResponse.status ? true : false);
			}
			this.indexTabSaveEvent = 0;
			this._crudMethod = CRUD_METHOD.UPDATE;
		});
  }

  clickSave(): void{
    if (this.formGroup.invalid) {
			return;
		}

    this.disabledButtonSave = true;
    this.formGroup.disable();

    const sentItem: IRequestGenre = {
      description: this.descriptionField.value as string,
      status: this.statusField.value as boolean
    }

    this._snotifyService.confirm('¿Desea guardar la información?', {
			position: SnotifyPosition.centerCenter,
			buttons: [
				{
					text: 'SI',
					bold: true,
					action: (toast) => {
						this._snotifyService.remove(toast.id);

						if (this._crudMethod === CRUD_METHOD.UPDATE) {
							this._update(sentItem);
							return;
						}

						this._save(sentItem);
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

  private _update (item: IRequestGenre){

    this._genreApiService.updateGenre(this.idField.value as number, item).subscribe({
			next: (response) => {
				if (response && response.success) {
					this._acctionsSucces();
          this._loadGenres();
					this._snotifyService.info('El registro se actualizo sin problemas');
				}
			},
			error: () => {
				this._acctionsSucces();
        this._snotifyService.error('Hubo un problema al actualizar el genero.');
			}
		});
  }

  private _save (newGenre: IRequestGenre){
    this._genreApiService.createGenre(newGenre.description).subscribe(
      {
        next: (response) => {
          if (response && response.success) {
            this.formGroup.reset();
            this._acctionsSucces();
            this._loadGenres();
            this._snotifyService.info('El genero se creo sin problema!');
          }
        },
        error: () => {
          this._acctionsSucces();
          this._snotifyService.info('Ocurrio un problema al tratar de crear el genero.');
        }
      }
    );
  }

  private _acctionsSucces(): void {
		this.disabledButtonSave = false;
		this.formGroup.enable();
    this.formGroup.reset();
	}

  get statusField(): AbstractControl {
		return this.formGroup.get('status')!;
	}

  get idField(): AbstractControl {
		return this.formGroup.get('id')!;
	}

	get descriptionField(): AbstractControl {
		return this.formGroup.get('description')!;
	}

}

import { Pipe, PipeTransform } from "@angular/core";
import { SnotifyPosition, SnotifyService } from 'ng-snotify';


@Pipe({
  name: 'FilterStatus'
})
export class StatusPipe implements PipeTransform {

  transform(value: boolean): string {

    var status = "";

    switch(value){
      case true:
        status="Activo";
        break;
      case false:
        status="Inactivo";
        break;
    }
    return  status;
  }
}
