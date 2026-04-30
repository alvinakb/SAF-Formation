import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabulaireProfessionnel } from './vocabulaire-professionnel';

describe('VocabulaireProfessionnel', () => {
  let component: VocabulaireProfessionnel;
  let fixture: ComponentFixture<VocabulaireProfessionnel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabulaireProfessionnel],
    }).compileComponents();

    fixture = TestBed.createComponent(VocabulaireProfessionnel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
