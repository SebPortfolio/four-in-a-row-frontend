import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { Observable, Subject, catchError, concat, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { HighlightPipe } from '../pipes/highlight.pipe';

@Component({
    selector: 'app-backend-select',
    standalone: true,
    imports: [CommonModule, FormsModule, NgSelectModule, HighlightPipe],
    templateUrl: './backend-select.component.html',
    styleUrl: './backend-select.component.less',
})
export class BackendSelectComponent {
    @Input() placeholder = 'Suchen...';
    @Input() minTermLength = 3;
    @Input() bindLabel = 'Wert';
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
    loading = false;
    searchInput$ = new Subject<string>();
    searchTermLength: number = 0;

    ngOnInit() {
        this.items$ = concat(
            of([]), // Initial leer
            this.searchInput$.pipe(
                debounceTime(300), // Warte 300ms nach dem Tippen
                distinctUntilChanged(), // Nur feuern, wenn sich der Text geändert hat
                tap(term => {
                    this.searchTermLength = term?.length || 0;
                    this.loading = !!term && term.length >= this.minTermLength;
                }),
                switchMap(term => {
                    if (!term || term.length < this.minTermLength) {
                        this.loading = false;
                        return of([]);
                    }

                    return this.searchFn(term).pipe(
                        catchError(() => of([])),
                        tap(() => (this.loading = false))
                    );
                })
            )
        );
    }

    public clear() {
        this.internalValue = null;
        if (this.selectComponent) {
            this.selectComponent.clearModel();
        }
    }
}
