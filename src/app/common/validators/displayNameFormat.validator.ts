import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// TODO: möglicherweise komplexerer Validator um UX freundlich Fehlermeldungen anzeigen zu können
export function displayNameFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const regex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9]$/;

        const isValid = regex.test(value);
        return isValid ? null : { displayNameFormat: { value: control.value } };
    };
}
