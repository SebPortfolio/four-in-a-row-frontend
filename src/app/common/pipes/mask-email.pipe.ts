import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maskEmail',
    standalone: true,
})
export class MaskEmailPipe implements PipeTransform {
    transform(value: string | undefined | null): string {
        if (!value) {
            console.debug('Keine Email für mask übergeben');
            return '?';
        }

        const regex = /^(.).*(.@.).*(.)$/;
        const match = value.match(regex);

        if (match) {
            return `${match[1]}***${match[2]}***${match[3]}`;
        }

        console.warn('Email passt nicht in die mask Regex');
        return value;
    }
}
