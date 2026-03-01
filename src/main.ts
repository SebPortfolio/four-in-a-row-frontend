import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
