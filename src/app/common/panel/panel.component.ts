import { NgClass } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class PanelComponent implements OnInit {
    @Input({ required: true }) panelTitle: string = '';
    /** Kann das Panel eingeklappt werden? */
    @Input() isCollapsible: boolean = true;
    /** Ist das Panel bei Initialisierung eingeklappt? */
    @Input() isCollapsed: boolean = false;
    @ContentChild('footerContent') footerExists?: ElementRef;

    @Output()
    openEvent = new EventEmitter<boolean>();

    ngOnInit(): void {
        if (!this.isCollapsible && this.isCollapsed) {
            console.warn(
                `Panel kann nicht isCollapsible false und gleichzeitig isCollapsed true haben\n. isCollapsible wird auf true gesetzt`
            );
            this.isCollapsible = true;
        }
    }

    onClick(): void {
        this.isCollapsed = this.isCollapsible ? !this.isCollapsed : false;
        this.openEvent.emit(this.isCollapsed);
    }

    // FaIcons
    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;
}
