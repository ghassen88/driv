import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitContainerComponent } from './kit-container.component';

describe('KitContainerComponent', () => {
  let component: KitContainerComponent;
  let fixture: ComponentFixture<KitContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
