import { Component, Input } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
    selector: 'app-shared-dialog',
    standalone: true,
    imports: [],
    templateUrl: './shared-dialog.component.html',
    styleUrl: './shared-dialog.component.less',
})
export class SharedDialogComponent {
    @Input() title: string = '';
    @Input() showFooter: boolean = false;

    constructor(private dialogService: DialogService) {}

    onClose(): void {
        this.dialogService.close();
    }
}
