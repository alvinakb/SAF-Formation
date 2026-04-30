import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompagnementQualiopi } from './accompagnement-qualiopi';

describe('AccompagnementQualiopi', () => {
  let component: AccompagnementQualiopi;
  let fixture: ComponentFixture<AccompagnementQualiopi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccompagnementQualiopi],
    }).compileComponents();

    fixture = TestBed.createComponent(AccompagnementQualiopi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
