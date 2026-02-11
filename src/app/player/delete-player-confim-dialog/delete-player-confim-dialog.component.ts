import { Component, Input } from '@angular/core';
import { DialogService } from '../../common/dialog/dialog.service';

@Component({
    selector: 'app-delete-player-confim-dialog',
    standalone: true,
    imports: [],
    templateUrl: './delete-player-confim-dialog.component.html',
    styleUrl: './delete-player-confim-dialog.component.less',
})
export class DeletePlayerConfimDialogComponent {
    @Input() playerId?: number;

    constructor(private dialogService: DialogService) {}

    onConfirm() {
        if (!this.playerId) {
            console.warn('Löschen nicht möglich: Keine playerId vorhanden.');
            return this.closeWithoutDelete();
        }

        this.dialogService.close(true);
    }

    onCancel(): void {
        this.closeWithoutDelete();
    }

    private closeWithoutDelete(): void {
        this.dialogService.close(false);
    }
}
