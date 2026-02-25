import { Directive, effect, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Permission } from '../../core/auth/permissions.model';

@Directive({
    selector: '[hasPermission]',
    standalone: true,
})
export class HasPermissionDirective {
    permission = input.required<Permission | Permission[]>({ alias: 'hasPermission' });

    constructor(
        private templateRef: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService
    ) {
        effect(() => {
            this.updateView();
        });
    }

    private updateView(): void {
        this.viewContainer.clear();

        const currentPermission = this.permission();

        if (!currentPermission || (Array.isArray(currentPermission) && currentPermission.length === 0)) {
            console.warn('keine zu filternden Permissions angegeben');
            return;
        }

        const permissionList: Permission[] = Array.isArray(currentPermission) ? currentPermission : [currentPermission];

        if (this.authService.hasAnyPermission(permissionList)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
