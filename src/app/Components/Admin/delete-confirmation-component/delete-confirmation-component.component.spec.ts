import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationComponentComponent } from './delete-confirmation-component.component';

describe('DeleteConfirmationComponentComponent', () => {
  let component: DeleteConfirmationComponentComponent;
  let fixture: ComponentFixture<DeleteConfirmationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmationComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteConfirmationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
