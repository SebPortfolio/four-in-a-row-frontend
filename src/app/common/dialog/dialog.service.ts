import { Injectable, signal } from '@angular/core';
import { DialogConfig } from './dialog.model';

@Injectable({ providedIn: 'root' })
export class DialogService {
    // WritableSignal ist die "interne" Version, in die man schreiben kann
    private readonly _dialogState = signal<DialogConfig | null>(null);
    readonly dialogState = this._dialogState.asReadonly();

    open(config: DialogConfig): void {
        this._dialogState.set(config);
    }

    close(): void {
        this._dialogState.set(null);
    }
}
