import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuestionService } from './question.service';

describe('QuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: QuestionService = TestBed.get(QuestionService);
    expect(service).toBeTruthy();
  });
  it('should get users', inject([HttpTestingController, QuestionService],
    (httpMock: HttpTestingController, QuestionService: QuestionService) => {
      expect(QuestionService).toBeTruthy();
    }
  )
);
});
