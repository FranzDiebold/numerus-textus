import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NumberToTextService } from './number-to-text.service';

describe('NumberToTextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ NumberToTextService ]
    });
  });

  it('should be created', inject([NumberToTextService], (service: NumberToTextService) => {
    expect(service).toBeTruthy();
  }));
});
