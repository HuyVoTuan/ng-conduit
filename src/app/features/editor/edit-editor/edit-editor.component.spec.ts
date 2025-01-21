import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEditorComponent } from './edit-editor.component';

describe('EditEditorComponent', () => {
  let component: EditEditorComponent;
  let fixture: ComponentFixture<EditEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
