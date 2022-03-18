import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import LocaleEsPe from '@angular/common/locales/es-PE';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerModule } from './commons/components/container/container.module';
import { ApiInterceptor } from './commons/interceptors/api.interceptor';
import { ErrorApiInterceptor } from './commons/interceptors/error-api.interceptor';
import { SharedComponentsModule } from './commons/shared/shared-components.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

registerLocaleData(LocaleEsPe);

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [AppComponent, HomePageComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MatSelectModule,
		ContainerModule,
		SharedComponentsModule,
		HttpClientModule,
		NgxUiLoaderModule,
		SnotifyModule
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-PE' },
		{ provide: 'SnotifyToastConfig', useValue: ToastDefaults },
		{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorApiInterceptor, multi: true },
		SnotifyService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
