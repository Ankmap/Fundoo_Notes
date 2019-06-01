import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlabelComponent } from './getlabel.component';

describe('GetlabelComponent', () => {
  let component: GetlabelComponent;
  let fixture: ComponentFixture<GetlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
