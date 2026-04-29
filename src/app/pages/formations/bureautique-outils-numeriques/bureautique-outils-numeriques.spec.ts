import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BureautiqueOutilsNumeriques } from './bureautique-outils-numeriques';

describe('BureautiqueOutilsNumeriques', () => {
  let component: BureautiqueOutilsNumeriques;
  let fixture: ComponentFixture<BureautiqueOutilsNumeriques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BureautiqueOutilsNumeriques],
    }).compileComponents();

    fixture = TestBed.createComponent(BureautiqueOutilsNumeriques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
