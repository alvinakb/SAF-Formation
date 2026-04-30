import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategiesCommunication } from './strategies-communication';

describe('StrategiesCommunication', () => {
  let component: StrategiesCommunication;
  let fixture: ComponentFixture<StrategiesCommunication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategiesCommunication],
    }).compileComponents();

    fixture = TestBed.createComponent(StrategiesCommunication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
