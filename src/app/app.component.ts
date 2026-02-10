import { Component, computed, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedDialogComponent } from './common/dialog/shared-dialog/shared-dialog.component';
import { CommonModule } from '@angular/common';
import { DialogService } from './common/dialog/dialog.service';
import { DialogConfig } from './common/dialog/dialog.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SharedDialogComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    readonly currentDialog: Signal<DialogConfig | null> = computed(() => this.dialogService.dialogState());

    constructor(private dialogService: DialogService) {}
}
