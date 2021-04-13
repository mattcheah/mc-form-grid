import { TestBed } from '@angular/core/testing';

import { McFormGridService } from './mc-form-grid.service';

describe('McFormGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: McFormGridService = TestBed.get(McFormGridService);
    expect(service).toBeTruthy();
  });
});
