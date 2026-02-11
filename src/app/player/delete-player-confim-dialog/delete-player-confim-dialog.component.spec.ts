import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlayerConfimDialogComponent } from './delete-player-confim-dialog.component';

describe('DeletePlayerConfimDialogComponent', () => {
    let component: DeletePlayerConfimDialogComponent;
    let fixture: ComponentFixture<DeletePlayerConfimDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeletePlayerConfimDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DeletePlayerConfimDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
