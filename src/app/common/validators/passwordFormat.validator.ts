import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// TODO: möglicherweise komplexerer Validator um UX freundlich Fehlermeldungen anzeigen zu können
export function passwordFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const isValid = regex.test(value);
        return isValid ? null : { passwordFormat: { value: control.value } };
    };
}
