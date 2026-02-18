/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogConfig } from './dialog.model';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private readonly _dialogState: WritableSignal<DialogConfig | null> = signal<DialogConfig | null>(null);
    readonly dialogState: Signal<DialogConfig | null> = this._dialogState.asReadonly();

    // Subject für das Ergebnis des aktuellen Dialogs
    private resultSubject = new Subject<any>();

    open(config: DialogConfig): Subject<any> {
        this.resultSubject = new Subject<any>();
        this._dialogState.set(config);
        return this.resultSubject;
    }

    close(result?: any): void {
        this._dialogState.set(null);
        this.resultSubject.next(result);
        this.resultSubject.complete();
    }
}
