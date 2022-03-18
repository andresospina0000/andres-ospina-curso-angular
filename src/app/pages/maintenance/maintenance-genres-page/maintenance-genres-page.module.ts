import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceGenresPageComponent, StatusPipe } from './maintenance-genres-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/commons/guards/candeactive.guard';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedFormModule } from 'src/app/commons/shared/shared-form.module';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
	{ path: '', canDeactivate: [CanDeactivateGuard], component: MaintenanceGenresPageComponent }
];

@NgModule({
  declarations: [
    MaintenanceGenresPageComponent,
    StatusPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
		MatTableModule,
		MatTabsModule,
		MatMenuModule,
		MatPaginatorModule,
		SharedFormModule
  ]
})
export class MaintenanceGenresPageModule { }
