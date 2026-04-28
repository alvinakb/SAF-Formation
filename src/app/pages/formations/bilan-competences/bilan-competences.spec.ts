import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanCompetences } from './bilan-competences';

describe('BilanCompetences', () => {
  let component: BilanCompetences;
  let fixture: ComponentFixture<BilanCompetences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanCompetences],
    }).compileComponents();

    fixture = TestBed.createComponent(BilanCompetences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
