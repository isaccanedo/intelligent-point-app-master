import { TestBed } from '@angular/core/testing';

import { LancamentoService } from './lancamento.service';

describe('LancamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LancamentoService = TestBed.get(LancamentoService);
    expect(service).toBeTruthy();
  });
});
