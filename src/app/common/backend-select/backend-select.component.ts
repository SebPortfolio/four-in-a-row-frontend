/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { catchError, concat, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
    selector: 'app-backend-select',
    standalone: true,
    imports: [AsyncPipe, FormsModule, NgSelectModule, HighlightPipe, SpinnerComponent],
    templateUrl: './backend-select.component.html',
    styleUrl: './backend-select.component.less',
})
export class BackendSelectComponent {
    @Input() labelForId: string = '';
    @Input() placeholder: string = 'Suchen...';
    @Input() minTermLength: number = 3;
    @Input() bindLabel: string = 'Wert';
    @Input() searchFn!: (term: string) => Observable<any[]>;

    @ViewChild(NgSelectComponent) selectComponent!: NgSelectComponent;

    internalValue: any = null;

    @Input() set value(val: any) {
        // Wenn der Wert identisch, nichts tun
        if (val === this.internalValue) return;

        this.internalValue = val;

        // Nur löschen, wenn von außen ein Reset (null/undefined) kommt
        if (!val && this.selectComponent) {
            setTimeout(() => this.selectComponent.clearModel());
        }
    }

    @Output() selected = new EventEmitter<any>();

    items$!: Observable<any[]>;
    isLoading = signal<boolean>(false);
    searchInput$ = new Subject<string>();
    searchTermLength: number = 0;

    ngOnInit(): void {
        this.items$ = concat(
            of([]), // Initial leer
            this.searchInput$.pipe(
                debounceTime(300), // Warte 300ms nach dem Tippen
                distinctUntilChanged(), // Nur feuern, wenn sich der Text geändert hat
                tap(term => {
                    this.searchTermLength = term?.length || 0;
                    this.isLoading.set(!!term && term.length >= this.minTermLength);
                }),
                switchMap(term => {
                    if (!term || term.length < this.minTermLength) {
                        this.isLoading.set(false);
                        return of([]);
                    }

                    return this.searchFn(term).pipe(
                        catchError(() => of([])),
                        tap(results => {
                            console.debug('Suche abgeschlossen. Ergebnisse:', results);
                            this.isLoading.set(false);
                        })
                    );
                })
            )
        );
    }

    public clear(): void {
        this.internalValue = null;
        if (this.selectComponent) {
            this.selectComponent.clearModel();
        }
    }
}
