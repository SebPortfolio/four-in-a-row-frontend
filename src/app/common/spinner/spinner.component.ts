import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [NgClass, TranslateModule],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.less',
})
export class SpinnerComponent {
    size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
    /** Mit `null` kann die Message komplett entfernt werden. */
    message = input<string | null>('Lade');
    isLoading = input.required<boolean>();
}
