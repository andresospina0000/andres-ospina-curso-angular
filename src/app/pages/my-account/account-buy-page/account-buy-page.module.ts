import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountBuyPageComponent } from './account-buy-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedFormModule } from 'src/app/commons/shared/shared-form.module';

export const routes: Routes = [{ path: '', component: AccountBuyPageComponent }];

@NgModule({
	declarations: [AccountBuyPageComponent],
	imports: [
    RouterModule.forChild(routes),
    SharedFormModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule]
})
export class AccountBuyPageModule {}
