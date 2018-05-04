import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigilabListComponent } from './digilab-list.component';

describe('DigilabListComponent', () => {
  let component: DigilabListComponent;
  let fixture: ComponentFixture<DigilabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigilabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigilabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
