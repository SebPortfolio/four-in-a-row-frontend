import { TestBed } from '@angular/core/testing';

import { PlayerAdminApiService } from './player-admin-api.service';

describe('PlayerAdminApiService', () => {
    let service: PlayerAdminApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PlayerAdminApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
