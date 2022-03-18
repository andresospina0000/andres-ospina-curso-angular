import { MaintenanceGenresPageModule } from './maintenance-genres-page/maintenance-genres-page.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH_MAINTENANCE_PAGES } from './../../commons/config/path-pages';
import { AuthGuard } from './../../commons/guards/auth.guard';
import { MaintenanceComponent } from './maintenance.component';

export const routes: Routes = [
	{
		path: '',
		component: MaintenanceComponent,
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		children: [
			{
				path: PATH_MAINTENANCE_PAGES.buy.onlyPath,
				loadChildren: () =>
					import('./maintenance-buy-page/maintenance-buy-page.module').then((m) => m.MaintenanceBuyPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.events.onlyPath,
				loadChildren: () =>
					import('./maintenance-events-page/maintenance-events-page.module').then((m) => m.MaintenanceEventsPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.reports.onlyPath,
				loadChildren: () =>
					import('./maintenance-reports/maintenance-reports.module').then((m) => m.MaintenanceReportsModule)
			},
      {
				path: PATH_MAINTENANCE_PAGES.genres.onlyPath,
				loadChildren: () =>
					import('./maintenance-genres-page/maintenance-genres-page.module').then((m) => m.MaintenanceGenresPageModule)
			},
			{
				path: '',
				redirectTo: PATH_MAINTENANCE_PAGES.buy.onlyPath
			}
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MaintenanceRoutingModule {}
