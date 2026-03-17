import {
    AfterViewInit,
    Component,
    effect,
    inject,
    input,
    signal,
    TemplateRef,
    untracked,
    ViewChild,
} from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { AuditPillComponent } from '../../common/audit-pill/audit-pill.component';
import { DatatableComponent, TableColumn, TableConfig } from '../../common/datatable/datatable.component';
import { FormService } from '../../common/form.service';
import { PanelComponent } from '../../common/panel/panel.component';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { UserResponse } from '../../user/user.model';
import { UserAudit } from '../admin.model';
import { UserAdminApiService } from '../user-admin-api.service';

@Component({
    selector: 'app-admin-user-history-panel',
    standalone: true,
    imports: [PanelComponent, SpinnerComponent, DatatableComponent, AuditPillComponent],
    templateUrl: './admin-user-history-panel.component.html',
    styleUrl: './admin-user-history-panel.component.less',
})
export class AdminUserHistoryPanelComponent implements AfterViewInit {
    userAdminApiService = inject(UserAdminApiService);
    formService = inject(FormService);

    userId = input.required<number>();
    isLoading = signal<boolean>(false);
    history = signal<UserAudit[] | undefined>(undefined);
    tableConfig?: TableConfig;
    @ViewChild('auditPillTemplate', { static: true }) auditPillTemplate!: TemplateRef<unknown>;
    refreshTrigger = input<unknown>();

    constructor() {
        effect(() => {
            // nur von userId ist der effect abhängig
            this.userId();
            this.refreshTrigger();
            // Durch untracked verhindern, dass Signale innerhalb von
            // loadHistory (z.B. isLoading()) den Effekt erneut triggern.
            untracked(() => this.loadHistory());
        });
    }

    ngAfterViewInit(): void {
        this.initTableConfig();
    }

    private loadHistory(): void {
        this.history.set(undefined);
        this.isLoading.set(true);
        this.userAdminApiService
            .getUserHistory(this.userId())
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: res => {
                    const historyWithDiff = this.extendWithFieldNameDiffs(res);
                    this.history.set(historyWithDiff);
                },
                error: err => {
                    console.error('Fehler bei der Abfrage der User-Historie: ', this.userId(), err);
                },
            });
    }

    private extendWithFieldNameDiffs(response: UserAudit[]): UserAudit[] {
        const extendedHistory = response.map((current, index) => {
            // Annahme: res ist absteigend sortiert (neueste zuerst)
            // Dann ist der Vorgänger res[index + 1]
            const previous = response[index + 1];
            const entityKeys = previous
                ? this.formService.getKeys(previous.entity)
                : this.formService.getKeys(current.entity);

            const diffObj = previous
                ? this.formService.getChangedValues(previous.entity, current.entity, entityKeys)
                : current.entity;

            const keys = Object.keys(diffObj) as (keyof UserResponse)[];

            return {
                ...current,
                changedFields: keys,
            };

            /*
            keys.forEach(key => {
                flatHistory.push({
                    // Metadaten vom Audit-Eintrag (bleiben pro Änderung gleich)
                    timestamp: current.timestamp,
                    modifierUserId: current.modifierUserId,
                    revisionType: current.revisionType,
                    // Die eigentliche Änderung (die separate Spalten bekommt)
                    fieldName: key,
                    preValue: previous ? previous.entity[key] : null,
                    postValue: current.entity[key],
                });
            });
            */
        });

        return extendedHistory;
    }

    private initTableConfig(): void {
        this.tableConfig = {
            title: 'Benutzer-Historie',
            columns: this.initTableColumns(),
            limit: 5,
        };
    }

    private initTableColumns(): TableColumn[] {
        return [
            {
                name: 'Zeitpunkt',
                prop: 'timestamp',
                type: 'dateTimeFull',
                minWidth: 90,
                width: 150,
                maxWidth: 200,
            },
            {
                name: 'Ausführender Nutzer',
                prop: 'modifierUserId',
                type: 'number',
                width: 150,
                maxWidth: 200,
            },
            {
                name: 'Operation',
                prop: 'revisionType',
                width: 100,
                maxWidth: 140,
                cellTemplate: this.auditPillTemplate,
            },
            {
                name: 'Geänderte Felder',
                prop: 'changedFields',
                class: 'break-spaces',
                width: 200,
                transform: (val: string[]) => (val?.length ? val.sort().join(', ') : '-'),
            },
            /*
            {
                name: 'Vorher',
                prop: 'preValue',
                class: 'audit-val-old',
                width: 200,
                transform: val => this.formatValue(val),
            },
            {
                name: 'Nachher',
                prop: 'postValue',
                class: 'audit-val-new',
                width: 200,
                transform: val => this.formatValue(val),
            },
            */
        ];
    }

    private formatValue(val: object | string): string {
        if (Array.isArray(val)) return '[ ' + val.join(', ') + ' ]';
        if (typeof val === 'object') return JSON.stringify(val);
        return String(val);
    }

    // fa-icons
    faArrowRight = faArrowRight;
}
