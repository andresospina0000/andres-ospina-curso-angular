import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from './../../commons/shared/shared-components.module';
import { SharedFormModule } from './../../commons/shared/shared-form.module';
import { BuyPageComponent } from './buy-page.component';

export const routes: Routes = [{ path: '', component: BuyPageComponent }];

@NgModule({
	declarations: [BuyPageComponent],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		MatCardModule,
		SharedComponentsModule,
		SharedFormModule
	]
})
export class BuyPageModule {}
