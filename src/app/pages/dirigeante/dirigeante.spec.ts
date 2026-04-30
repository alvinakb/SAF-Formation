import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dirigeante } from './dirigeante';

describe('Dirigeante', () => {
  let component: Dirigeante;
  let fixture: ComponentFixture<Dirigeante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dirigeante],
    }).compileComponents();

    fixture = TestBed.createComponent(Dirigeante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
