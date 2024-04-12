import { TestBed } from '@angular/core/testing';

import { DropZoneService } from './drop-zone.service';

describe('DropzoneService', () => {
  let service: DropZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
