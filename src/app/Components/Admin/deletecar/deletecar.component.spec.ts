import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecarComponent } from './deletecar.component';

describe('DeletecarComponent', () => {
  let component: DeletecarComponent;
  let fixture: ComponentFixture<DeletecarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletecarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletecarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
