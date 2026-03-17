import { UpperCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevisionType } from '../../admin/admin.model';
import { AUDIT_TYPE_MAP } from '../../core/constants/common.constant';

@Component({
    selector: 'app-audit-pill',
    standalone: true,
    imports: [TranslateModule, UpperCasePipe],
    templateUrl: './audit-pill.component.html',
    styleUrl: './audit-pill.component.less',
})
export class AuditPillComponent {
    revisionType = input.required<RevisionType>();

    typeValues = computed(() => AUDIT_TYPE_MAP[this.revisionType()]);
}
