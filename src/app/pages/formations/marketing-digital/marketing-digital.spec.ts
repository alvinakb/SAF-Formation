import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingDigital } from './marketing-digital';

describe('MarketingDigital', () => {
  let component: MarketingDigital;
  let fixture: ComponentFixture<MarketingDigital>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingDigital],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketingDigital);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
