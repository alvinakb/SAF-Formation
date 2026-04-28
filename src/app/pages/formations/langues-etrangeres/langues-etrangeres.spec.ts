import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguesEtrangeres } from './langues-etrangeres';

describe('LanguesEtrangeres', () => {
  let component: LanguesEtrangeres;
  let fixture: ComponentFixture<LanguesEtrangeres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguesEtrangeres],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguesEtrangeres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
