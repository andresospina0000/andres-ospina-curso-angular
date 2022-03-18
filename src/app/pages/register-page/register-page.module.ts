import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormModule } from 'src/app/commons/shared/shared-form.module';
import { RegisterPageComponent } from './register-page.component';

export const routes: Routes = [{ path: '', component: RegisterPageComponent }];

@NgModule({
	declarations: [RegisterPageComponent],
	imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule, MatCardModule, SharedFormModule]
})
export class RegisterPageModule {}
