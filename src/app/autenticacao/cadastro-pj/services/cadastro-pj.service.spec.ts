import { TestBed } from '@angular/core/testing';

import { CadastrarPjService } from './cadastrar-pj.service';

describe('CadastroPjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastrarPjService = TestBed.get(CadastrarPjService);
    expect(service).toBeTruthy();
  });
});
