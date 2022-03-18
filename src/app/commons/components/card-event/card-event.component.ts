import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICardEvent } from '../../models/components.interface';

@Component({
	selector: 'app-card-event',
	templateUrl: './card-event.component.html',
	styleUrls: ['./card-event.component.scss']
})
export class CardEventComponent {
	@Input() event: ICardEvent | undefined;

	@Output() clickCard = new EventEmitter<ICardEvent>();

	clickEvent(): void {
		this.clickCard.emit(this.event);
	}
}
