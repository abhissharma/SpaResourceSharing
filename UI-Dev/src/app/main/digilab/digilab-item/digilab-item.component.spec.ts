import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigilabItemComponent } from './digilab-item.component';

describe('DigilabItemComponent', () => {
  let component: DigilabItemComponent;
  let fixture: ComponentFixture<DigilabItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigilabItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigilabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
