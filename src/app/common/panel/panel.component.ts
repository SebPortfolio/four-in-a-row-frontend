import { NgClass } from '@angular/common';
import { Component, ContentChild, effect, ElementRef, EventEmitter, input, model, Output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-panel',
    standalone: true,
    imports: [FaIconComponent, TranslateModule, NgbCollapse, NgClass],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.less',
})
export class PanelComponent {
    panelTitle = input.required<string>();
    /** Kann das Panel eingeklappt werden? */
    isCollapsible = input<boolean>(true);
    /** Ist das Panel bei Initialisierung eingeklappt? */
    isCollapsed = model<boolean>(false);

    constructor() {
        effect(
            () => {
                if (!this.isCollapsible() && this.isCollapsed()) {
                    console.warn(
                        'Illegale Konfiguration: isCollapsed wurde auf false gesetzt, da das Panel nicht einklappbar ist.'
                    );

                    this.isCollapsed.set(false);
                }
            },
            { allowSignalWrites: true }
        );
    }

    @ContentChild('footerContent') footerExists?: ElementRef;

    @Output()
    openEvent = new EventEmitter<boolean>();

    onClick(): void {
        if (this.isCollapsible()) {
            this.isCollapsed.update(v => !v);
        }
    }

    // fa-icons
    protected readonly faCaretDown = faCaretDown;
    protected readonly faCaretUp = faCaretUp;
}
