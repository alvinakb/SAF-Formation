import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nosvaleurs } from './nos-valeurs';

describe('NosValeurs', () => {
  let component: NosValeurs;
  let fixture: ComponentFixture<NosValeurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosValeurs],
    }).compileComponents();

    fixture = TestBed.createComponent(NosValeurs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
