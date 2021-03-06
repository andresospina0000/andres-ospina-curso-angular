import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormModule } from './../../../commons/shared/shared-form.module';
import { MaintenanceBuyPageComponent } from './maintenance-buy-page.component';

export const routes: Routes = [{ path: '', component: MaintenanceBuyPageComponent }];
@NgModule({
	declarations: [MaintenanceBuyPageComponent],
	imports: [CommonModule, RouterModule.forChild(routes), MatTableModule, MatPaginatorModule, SharedFormModule]
})
export class MaintenanceBuyPageModule {}
