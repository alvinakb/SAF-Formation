import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilClient } from './accueil-client';

describe('AccueilClient', () => {
  let component: AccueilClient;
  let fixture: ComponentFixture<AccueilClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilClient],
    }).compileComponents();

    fixture = TestBed.createComponent(AccueilClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
