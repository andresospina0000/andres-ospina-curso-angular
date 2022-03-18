import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormModule } from 'src/app/commons/shared/shared-form.module';
import { MaintenanceReportsComponent } from './maintenance-reports.component';

export const routes: Routes = [{ path: '', component: MaintenanceReportsComponent }];

@NgModule({
	declarations: [MaintenanceReportsComponent],
	imports: [RouterModule.forChild(routes), SharedFormModule]
})
export class MaintenanceReportsModule {}
