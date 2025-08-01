import { TestBed } from '@angular/core/testing';

import { KapazitaetsabweichungService } from './kapazitaetsabweichung.service';

describe('KapazitaetsabweichungService', () => {
  let service: KapazitaetsabweichungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KapazitaetsabweichungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
