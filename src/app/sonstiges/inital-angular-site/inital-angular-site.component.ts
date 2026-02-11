import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-inital-angular-site',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './inital-angular-site.component.html',
    styleUrl: './inital-angular-site.component.less',
})
export class InitalAngularSiteComponent {
    protected readonly faGithub = faGithub;
    title = 'four-in-a-row';
}
