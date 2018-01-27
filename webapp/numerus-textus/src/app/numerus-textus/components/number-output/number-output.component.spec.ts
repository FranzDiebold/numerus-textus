import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOutputComponent } from './number-output.component';

describe('NumberOutputComponent', () => {
  let component: NumberOutputComponent;
  let fixture: ComponentFixture<NumberOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
