import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitalAngularSiteComponent } from './inital-angular-site.component';

describe('InitalAngularSiteComponent', () => {
    let component: InitalAngularSiteComponent;
    let fixture: ComponentFixture<InitalAngularSiteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InitalAngularSiteComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InitalAngularSiteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(InitalAngularSiteComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have the 'four-in-a-row' title`, () => {
        const fixture = TestBed.createComponent(InitalAngularSiteComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('four-in-a-row');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(InitalAngularSiteComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Hello, four-in-a-row');
    });
});
