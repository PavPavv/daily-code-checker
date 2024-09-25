import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoGreetComponent } from './basic-info-greet.component';

describe('BasicInfoGreetComponent', () => {
  let component: BasicInfoGreetComponent;
  let fixture: ComponentFixture<BasicInfoGreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicInfoGreetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicInfoGreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
