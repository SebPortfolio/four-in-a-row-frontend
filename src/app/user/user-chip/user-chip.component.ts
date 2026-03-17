import { Component, computed, inject, Input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MeService } from '../../core/auth/me.service';
import { MyProfile } from '../user.model';

@Component({
    selector: 'app-user-chip',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './user-chip.component.html',
    styleUrl: './user-chip.component.less',
})
export class UserChipComponent {
    @Input() mode: 'compact' | 'full' = 'compact';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';

    private meService = inject(MeService);
    protected user: Signal<MyProfile | null> = this.meService.currentUser;

    protected displayNameFull: Signal<string> = computed(() => this.user()?.displayName || '');

    protected displayNameFirstChar: Signal<string> = computed(() => this.displayNameFull().charAt(0).toUpperCase());

    protected avatarColor: Signal<string> = computed(() => this.generateColor(this.displayNameFull()));

    private generateColor(name: string): string {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            // Schiebe Bits und addiere Zeichencode (einfacher Hash-Algorithmus)
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        const hue = Math.abs(hash % 360);
        return `hsl(${hue}, 65%, 50%)`;
    }
}
