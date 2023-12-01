import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSellerDialogComponent } from './add-seller-dialog.component';

describe('AddSellerDialogComponent', () => {
  let component: AddSellerDialogComponent;
  let fixture: ComponentFixture<AddSellerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSellerDialogComponent]
    });
    fixture = TestBed.createComponent(AddSellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
