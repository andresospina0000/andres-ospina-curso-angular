import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormModule } from 'src/app/commons/shared/shared-form.module';
import { LoginPageComponent } from './login-page.component';

export const routes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
	declarations: [LoginPageComponent],
	imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule, MatCardModule, SharedFormModule]
})
export class LoginPageModule {}
