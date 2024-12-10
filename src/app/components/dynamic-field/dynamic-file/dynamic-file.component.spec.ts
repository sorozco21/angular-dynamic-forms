import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFileComponent } from './dynamic-file.component';

describe('DynamicFileComponent', () => {
  let component: DynamicFileComponent;
  let fixture: ComponentFixture<DynamicFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
