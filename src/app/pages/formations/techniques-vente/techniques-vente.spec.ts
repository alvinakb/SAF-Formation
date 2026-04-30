import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniquesVente } from './techniques-vente';

describe('TechniquesVente', () => {
  let component: TechniquesVente;
  let fixture: ComponentFixture<TechniquesVente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechniquesVente],
    }).compileComponents();

    fixture = TestBed.createComponent(TechniquesVente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
