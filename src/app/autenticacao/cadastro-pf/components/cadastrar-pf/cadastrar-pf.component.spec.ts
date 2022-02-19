import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPfComponent } from './';

describe('CadastroPfComponent', () => {
  let component: CadastrarPfComponent;
  let fixture: ComponentFixture<CadastrarPfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
