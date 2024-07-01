import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoBadgeComponent } from './basic-info-badge.component';

describe('BasicInfoBadgeComponent', () => {
  let component: BasicInfoBadgeComponent;
  let fixture: ComponentFixture<BasicInfoBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicInfoBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicInfoBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
