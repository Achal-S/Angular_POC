import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdOptionComponent } from './third-option.component';

describe('ThirdOptionComponent', () => {
  let component: ThirdOptionComponent;
  let fixture: ComponentFixture<ThirdOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
