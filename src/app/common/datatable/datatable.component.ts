import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
    faCaretDown,
    faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule, DatatableComponent as NgxTableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-datatable',
    standalone: true,
    imports: [NgxDatatableModule, TranslateModule, FontAwesomeModule],
    templateUrl: './datatable.component.html',
    styleUrl: './datatable.component.less',
})
export class DatatableComponent<T = Record<string, unknown>> implements OnInit, OnChanges {
    @Input() config?: TableConfig;
    @Input() data?: T[];

    protected columns!: TableColumn[];

    protected rows: T[] = [];
    private originalRows: T[] = [];
    private sortStrategy?: SortStrategy;

    private _messages?: TableMessages;

    set messages(messages: TableMessages | undefined) {
        this._messages = messages;
    }

    get messages(): TableMessages {
        if (this._messages) {
            return this._messages;
        }
        return {
            emptyMessage: 'Keine Daten',
            selectedMessage: 'Ausgewählt',
        };
    }

    @ViewChild('table') table!: NgxTableComponent;

    protected readonly math = Math;

    ngOnInit(): void {
        if (!this.config) {
            console.error('Datatable Komponente benötigt Config');
            return;
        }
        if (!this.data) {
            console.error('Datatable Komponente benötigt Daten');
            return;
        }
        this.columns = this.config.columns;
        this.rows = [...this.data];
        this.originalRows = [...this.rows];
        this.messages = this.config.messages;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config) {
            this.columns = [...this.config.columns];
        }

        if (changes['data']) {
            this.rows = [...(this.data || [])];
            this.originalRows = [...this.rows];
        }
        this.sortStrategy = undefined;
    }

    protected changePage(pageNumber: number): void {
        this.table.offset = pageNumber - 1;
    }

    protected onSort(prop: string): void {
        if (!(this.sortStrategy?.prop === prop)) {
            this.applySort(prop, 'asc');
        } else if (this.sortStrategy?.dir === 'asc') {
            this.applySort(prop, 'desc');
        } else {
            this.rows = [...this.originalRows];
            this.sortStrategy = undefined;
        }
    }

    protected getSortDir(prop: string): string | null {
        return this.sortStrategy?.prop === prop ? this.sortStrategy.dir : null;
    }

    private applySort(prop: string, dir: 'asc' | 'desc'): void {
        this.sortStrategy = { prop, dir };

        const columnDef = this.columns.find(c => c.prop === prop);

        // true: immer am Ende
        // false: mitfließen (asc: oben, desc: unten)
        const atBottom = columnDef?.emptyValuesAtBottom ?? true;

        this.rows = [...this.originalRows].sort((a, b) => {
            const valA = this.resolveDeepValue(a, prop);
            const valB = this.resolveDeepValue(b, prop);

            // Null/Undefined
            const isEmptyA = valA == null || valA === '';
            const isEmptyB = valB == null || valB === '';

            if (isEmptyA && isEmptyB) return 0;
            if (isEmptyA) {
                if (atBottom) return 1;
                return dir === 'asc' ? -1 : 1;
            }

            if (isEmptyB) {
                if (atBottom) return -1;
                return dir === 'asc' ? 1 : -1;
            }

            // Custom-Comparator
            if (columnDef?.comparator) {
                const result = columnDef.comparator(valA, valB);
                return dir === 'asc' ? result : -result;
            }

            // Datum
            const isDate = (val: unknown): boolean =>
                val instanceof Date || (typeof val === 'string' && !isNaN(Date.parse(val)) && isNaN(Number(val)));
            if (isDate(valA) && isDate(valB)) {
                const timeA = new Date(valA as string | Date).getTime();
                const timeB = new Date(valB as string | Date).getTime();
                return dir === 'asc' ? timeA - timeB : timeB - timeA;
            }

            // String (Locale-aware)
            if (typeof valA === 'string' && typeof valB === 'string') {
                const cmp = valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
                return dir === 'asc' ? cmp : -cmp;
            }

            // Standard (Zahlen, Boolean)
            if (valA < valB) return dir === 'asc' ? -1 : 1;
            if (valA > valB) return dir === 'asc' ? 1 : -1;
            return 0;
        });
    }

    private resolveDeepValue(obj: T, path: string): unknown {
        // statt name auch nutzer.name erlaubt
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return path.split('.').reduce((prev, curr) => (prev ? (prev as any)[curr] : undefined), obj);
    }

    // Icons für das Template bereitstellen
    protected faCaretUp = faCaretUp;
    protected faCaretDown = faCaretDown;
    protected faAngleLeft = faAngleLeft;
    protected faAngleRight = faAngleRight;
    protected faAnglesLeft = faAnglesLeft;
    protected faAnglesRight = faAnglesRight;
}

export type TableConfig = {
    title: string;
    columnFlex?: boolean;
    limit?: number;
    scrollbarH?: boolean;
    messages?: TableMessages;
    columns: TableColumn[];
};

export type TableMessages = {
    emptyMessage?: string;
    selectedMessage?: string;
};

export type TableColumn = {
    name: string; // label
    prop: string; // property of object to display,
    noDataStr?: string; // string to display, if no data
    flexGrow?: number;
    minWidth?: number;
    maxWidth?: number;
    width?: number;
    sortable?: boolean;
    emptyValuesAtBottom?: boolean; // Steuert die Position leerer Werte, bei false stehen leere Werte nicht dauerhaft hinten an
    href?: string;
    cellTemplate?: TemplateRef<any>;
    transform?: (value: any) => string;
    comparator?: (a: any, b: any) => number; // eigener Sortier-Algorithmus
};

export type SortStrategy = {
    prop: string;
    dir: 'asc' | 'desc' | null;
};
