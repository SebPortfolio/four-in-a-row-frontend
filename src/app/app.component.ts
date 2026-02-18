import { Component, computed, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogConfig } from './common/dialog/dialog.model';
import { DialogService } from './common/dialog/dialog.service';
import { SharedDialogComponent } from './common/dialog/shared-dialog/shared-dialog.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SharedDialogComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    readonly currentDialog: Signal<DialogConfig | null> = computed(() => this.dialogService.dialogState());

    constructor(private dialogService: DialogService) {}
}
