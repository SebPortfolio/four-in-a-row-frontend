import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from '../dialog.service';

@Component({
    selector: 'app-shared-dialog',
    standalone: true,
    imports: [FaIconComponent, NgClass, TranslateModule],
    templateUrl: './shared-dialog.component.html',
    styleUrl: './shared-dialog.component.less',
})
export class SharedDialogComponent {
    @Input() title: string = '';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';

    constructor(private dialogService: DialogService) {}

    onClose(): void {
        this.dialogService.close();
    }

    // fa-icons
    protected readonly faClose = faClose;
}
