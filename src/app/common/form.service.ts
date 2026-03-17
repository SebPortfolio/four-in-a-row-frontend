import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormService {
    constructor() {}

    public shouldMarkInvalid(form: FormGroup, controlName: string): boolean {
        try {
            const control = form.get(controlName);
            return !!(control?.invalid && control?.touched);
        } catch (error) {
            console.warn(`controlname '${controlName}' nicht in form definiert`, error);
            return false;
        }
    }

    /**
     * Erstellt ein Partial-Objekt, das nur die Differenzen enthält.
     * @param original Das Ausgangsobjekt (gegebenes Original aus der API)
     * @param updated Das geänderte Objekt (geänderte Werte aus dem Formular)
     * @param keysToCompare Die zu prüfenden Keys
     */
    public getChangedValues<T>(original: Partial<T>, updated: Partial<T>, keysToCompare: (keyof T)[]): Partial<T> {
        const diff: Partial<T> = {};

        keysToCompare.forEach((key: keyof T) => {
            const oldVal = original[key];
            const newVal = updated[key];

            if (Array.isArray(oldVal) && Array.isArray(newVal)) {
                const oldSorted = JSON.stringify([...oldVal].sort());
                const newSorted = JSON.stringify([...newVal].sort());

                if (oldSorted !== newSorted) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    diff[key] = newVal as any;
                }
            } else if (oldVal !== newVal) {
                if (!(oldVal == null && newVal == null)) {
                    diff[key] = newVal;
                }
            }
        });

        return diff;
    }

    /**
     * Gibt Object.keys() mit korrektem Key-Typ zurück
     */
    getKeys<T extends object>(obj: T): (keyof T)[] {
        return Object.keys(obj) as (keyof T)[];
    }
}
