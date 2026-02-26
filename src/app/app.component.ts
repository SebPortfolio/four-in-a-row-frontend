import { NgComponentOutlet } from '@angular/common';
import { Component, computed, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DialogConfig } from './common/dialog/dialog.model';
import { DialogService } from './common/dialog/dialog.service';
import { SharedDialogComponent } from './common/dialog/shared-dialog/shared-dialog.component';
import { NavbarComponent } from './sonstiges/navbar/navbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SharedDialogComponent, NgComponentOutlet, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    readonly currentDialog: Signal<DialogConfig | null> = computed(() => this.dialogService.dialogState());

    constructor(
        private dialogService: DialogService,
        private route: Router
    ) {}

    showNavbar(): boolean {
        const path = this.route.routerState.snapshot.url;
        return path !== '/login' && path !== '/sign-up';
    }
}
