import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablefiltterComponent } from './tablefiltter.component';

describe('TablefiltterComponent', () => {
  let component: TablefiltterComponent;
  let fixture: ComponentFixture<TablefiltterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablefiltterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablefiltterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
