import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStatTableComponent } from './daily-stat-table.component';

describe('DailyStatTableComponent', () => {
  let component: DailyStatTableComponent;
  let fixture: ComponentFixture<DailyStatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyStatTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
