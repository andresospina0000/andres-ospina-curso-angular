import { Component } from '@angular/core';
import { DemoService } from './demo.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'musical-event';

	constructor(private _demoService: DemoService) {}
}
