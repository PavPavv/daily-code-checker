import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStatContainerComponent } from './daily-stat-container.component';

describe('DailyStatContainerComponent', () => {
  let component: DailyStatContainerComponent;
  let fixture: ComponentFixture<DailyStatContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyStatContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyStatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
