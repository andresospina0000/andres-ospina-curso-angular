import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormModule } from 'src/app/commons/shared/shared-form.module';
import { AccountChangePasswordPageComponent } from './account-change-password-page.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [{ path: '', component: AccountChangePasswordPageComponent }];

@NgModule({
	declarations: [AccountChangePasswordPageComponent],
	imports: [
    RouterModule.forChild(routes),
    SharedFormModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AccountChangePasswordPageModule {}
