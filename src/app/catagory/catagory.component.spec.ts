import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryComponent } from './catagory.component';

describe('CatagoryComponent', () => {
  let component: CatagoryComponent;
  let fixture: ComponentFixture<CatagoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatagoryComponent]
    });
    fixture = TestBed.createComponent(CatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
