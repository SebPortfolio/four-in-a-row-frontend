import { TestBed } from '@angular/core/testing';

import { BanApiService } from './ban-api.service';

describe('BanApiService', () => {
    let service: BanApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BanApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
