import { TestBed } from '@angular/core/testing';

import { MeetingsDataService } from './meetings-data.service';

describe('MeetingsDataService', () => {
  let service: MeetingsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
