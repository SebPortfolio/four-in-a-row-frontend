import { Type } from '@angular/core';

export interface DialogConfig {
    title: string;
    /**
     * Die Komponente, die im Dialog angezeigt wird
     * Type<unknown> stellt sicher, dass es eine instanziierbare Klasse ist.
     */
    component: Type<unknown>;
    /**
     * Optionale Daten für die Komponente.
     * Objekt mit Strings als Schlüsseln und unbekannten Werten.
     */
    data?: Record<string, unknown>;
}
