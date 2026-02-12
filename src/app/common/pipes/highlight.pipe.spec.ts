import { DomSanitizer } from '@angular/platform-browser';
import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
    let pipe: HighlightPipe;
    let sanitizerMock: jasmine.SpyObj<DomSanitizer>;

    beforeEach(() => {
        // Mock für DomSanitizer erstellen
        sanitizerMock = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);

        // Mock gibt Wert zurück, den er erhält
        sanitizerMock.bypassSecurityTrustHtml.and.callFake((value: string) => value);

        // Mock an Pipe übergeben
        pipe = new HighlightPipe(sanitizerMock);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should highlight matching text', () => {
        const text = 'Max Mustermann';
        const search = 'Max';
        const result = pipe.transform(text, search);

        // Prüfen, ob der HTML-Tag korrekt eingefügt wurde
        expect(result).toContain('<span class="highlighted-text">Max</span>');
    });

    it('should return original text if no match is found', () => {
        const text = 'Max Mustermann';
        const search = 'Erika';
        const result = pipe.transform(text, search);

        expect(result).toBe(text);
    });
});
