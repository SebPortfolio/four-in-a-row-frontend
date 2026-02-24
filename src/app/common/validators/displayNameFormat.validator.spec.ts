import { FormControl, ValidationErrors } from '@angular/forms';
import { displayNameFormatValidator } from './displayNameFormat.validator';

describe('displayNameFormatValidator', () => {
    const validator = displayNameFormatValidator();

    // Hilfsfunktion, um Boilerplate zu reduzieren
    const validate = (value: string | null): ValidationErrors | null => validator(new FormControl(value));

    describe('Gültige Namen', () => {
        it('sollte bei einfachen Namen null zurückgeben', () => {
            expect(validate('PaulM')).toBeNull();
            expect(validate('Player123')).toBeNull();
        });

        it('sollte Namen mit erlaubten Sonderzeichen akzeptieren', () => {
            expect(validate('Max-Mustermann')).toBeNull();
            expect(validate('Der.Erste')).toBeNull();
            expect(validate('User_01')).toBeNull();
        });

        it('sollte die minimale Länge von 3 akzeptieren', () => {
            expect(validate('ABC')).toBeNull();
        });

        it('sollte die maximale Länge von 30 akzeptieren', () => {
            expect(validate('a'.repeat(30))).toBeNull();
        });

        it('sollte leere Werte ignorieren (Validation delegiert an Validators.required)', () => {
            expect(validate('')).toBeNull();
            expect(validate(null)).toBeNull();
        });
    });

    describe('Ungültige Namen', () => {
        it('sollte Fehler bei zu kurzen Namen (< 3) melden', () => {
            expect(validate('ab')).toEqual({ displayNameFormat: { value: 'ab' } });
        });

        it('sollte Fehler bei zu langen Namen (> 30) melden', () => {
            expect(validate('a'.repeat(31))).not.toBeNull();
        });

        it('sollte keine Sonderzeichen am Anfang erlauben', () => {
            expect(validate('.paul')).not.toBeNull();
            expect(validate('_paul')).not.toBeNull();
            expect(validate('-paul')).not.toBeNull();
        });

        it('sollte keine Sonderzeichen am Ende erlauben', () => {
            expect(validate('paul.')).not.toBeNull();
            expect(validate('paul_')).not.toBeNull();
            expect(validate('paul-')).not.toBeNull();
        });

        it('sollte keine aufeinanderfolgenden Sonderzeichen erlauben (Lookahead-Check)', () => {
            expect(validate('Max..Mustermann')).not.toBeNull();
            expect(validate('Max__Mustermann')).not.toBeNull();
            expect(validate('Max.-Mustermann')).not.toBeNull();
        });

        it('sollte keine illegalen Sonderzeichen erlauben', () => {
            expect(validate('Paul@Home')).not.toBeNull();
            expect(validate('Paul!123')).not.toBeNull();
            expect(validate('Paul Name')).not.toBeNull(); // Leerzeichen
        });
    });
});
