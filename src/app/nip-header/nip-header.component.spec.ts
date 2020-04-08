import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NipHeaderComponent } from './nip-header.component';

describe('NipHeaderComponent', () => {
  let component: NipHeaderComponent;
  let fixture: ComponentFixture<NipHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NipHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NipHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
