import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomestackComponent } from './homestack.component';

describe('HomestackComponent', () => {
  let component: HomestackComponent;
  let fixture: ComponentFixture<HomestackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomestackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomestackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
