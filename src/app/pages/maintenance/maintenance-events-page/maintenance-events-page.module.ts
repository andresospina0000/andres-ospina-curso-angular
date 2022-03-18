import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormModule } from 'src/app/commons/shared/shared-form.module';
import { CanDeactivateGuard } from './../../../commons/guards/candeactive.guard';
import { MaintenanceEventsPageComponent } from './maintenance-events-page.component';

export const routes: Routes = [
	{ path: '', canDeactivate: [CanDeactivateGuard], component: MaintenanceEventsPageComponent }
];
@NgModule({
	declarations: [MaintenanceEventsPageComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		MatTableModule,
		MatTabsModule,
		MatMenuModule,
		MatPaginatorModule,
		SharedFormModule
	],
	providers: [DatePipe]
})
export class MaintenanceEventsPageModule {}
