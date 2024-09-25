import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoSkillsComponent } from './basic-info-skills.component';

describe('BasicInfoSkillsComponent', () => {
  let component: BasicInfoSkillsComponent;
  let fixture: ComponentFixture<BasicInfoSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicInfoSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicInfoSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
