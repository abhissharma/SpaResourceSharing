import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigilabEditComponent } from './digilab-edit.component';

describe('DigilabEditComponent', () => {
  let component: DigilabEditComponent;
  let fixture: ComponentFixture<DigilabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigilabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigilabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
