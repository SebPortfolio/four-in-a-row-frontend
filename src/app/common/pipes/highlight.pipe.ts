import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'highlight',
    standalone: true,
})
export class HighlightPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(value: string, search: string | null): any {
        if (!value) return '';
        if (!search || search.length === 0) return value;
        const re = new RegExp(search, 'gi'); // 'gi' für Case-Insensitive
        const result = value.replace(re, match => `<span class="highlighted-text">${match}</span>`);
        return this.sanitizer.bypassSecurityTrustHtml(result);
    }
}
