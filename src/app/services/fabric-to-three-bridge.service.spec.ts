import { TestBed } from '@angular/core/testing';

import { FabricToThreeBridgeService } from './fabric-to-three-bridge.service';

describe('FabricToThreeBridgeService', () => {
  let service: FabricToThreeBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricToThreeBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
