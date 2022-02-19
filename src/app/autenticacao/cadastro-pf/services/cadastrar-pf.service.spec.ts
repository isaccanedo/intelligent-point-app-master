import { TestBed } from '@angular/core/testing';

import { CadastrarPfService } from './cadastrar-pf.service';

describe('CadastrarPfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastrarPfService = TestBed.get(CadastrarPfService);
    expect(service).toBeTruthy();
  });
});
