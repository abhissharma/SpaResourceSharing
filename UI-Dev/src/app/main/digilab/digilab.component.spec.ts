import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigilabComponent } from './digilab.component';

describe('DigilabComponent', () => {
  let component: DigilabComponent;
  let fixture: ComponentFixture<DigilabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigilabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigilabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
