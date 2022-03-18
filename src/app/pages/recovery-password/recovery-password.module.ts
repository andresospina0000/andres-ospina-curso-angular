import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryPasswordComponent } from './recovery-password.component';

export const routes: Routes = [{ path: '', component: RecoveryPasswordComponent }];

@NgModule({
	declarations: [RecoveryPasswordComponent],
	imports: [RouterModule.forChild(routes), MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule]
})
export class RecoveryPasswordPageModule {}
