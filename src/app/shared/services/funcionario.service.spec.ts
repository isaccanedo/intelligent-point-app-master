import { TestBed } from '@angular/core/testing';

import { FuncionarioService } from './funcionario.service';

describe('FuncionarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuncionarioService = TestBed.get(FuncionarioService);
    expect(service).toBeTruthy();
  });
});
