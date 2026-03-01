import { TestBed } from '@angular/core/testing';

import { UserAdminApiService } from './user-admin-api.service';

describe('UserAdminApiService', () => {
    let service: UserAdminApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UserAdminApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
