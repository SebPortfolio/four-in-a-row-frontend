import { formatDate } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { DateFormatType } from '../types';

@Pipe({
    name: 'appDate',
    standalone: true,
    pure: false, // Notwendig, um auf Sprachwechsel im Service zu reagieren
})
export class AppDatePipe implements PipeTransform {
    private readonly languageService = inject(LanguageService);

    private readonly formatConfig: Record<string, Record<DateFormatType, string>> = {
        de: {
            date: 'dd.MM.yyyy',
            dateTime: 'dd.MM.yyyy HH:mm',
            dateTimeFull: 'dd.MM.yyyy HH:mm:ss',
            time: 'HH:mm',
            timeFull: 'HH:mm:ss',
        },
        en: {
            date: 'MM/dd/yyyy',
            dateTime: 'MM/dd/yyyy hh:mm a',
            dateTimeFull: 'MM/dd/yyyy hh:mm:ss a',
            time: 'hh:mm a',
            timeFull: 'hh:mm:ss a',
        },
    };

    transform(value: string | number | Date | null | undefined, formatType: DateFormatType): string {
        if (!value || value === '') {
            console.warn('Kein Datum zum formatieren übergeben');
            return '';
        }
        const curLang: string = this.languageService.currentLang();

        const activeConfig = this.formatConfig[curLang] || this.formatConfig[this.languageService.appDefaultLangCode];
        const pattern = activeConfig[formatType];

        try {
            return formatDate(value, pattern, curLang);
        } catch (error) {
            console.error('AppDatePipe Error:', error);
            return String(value);
        }
    }
}
