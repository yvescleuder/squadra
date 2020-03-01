import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSistemaComponent } from './create-sistema.component';

describe('CreateSistemaComponent', () => {
  let component: CreateSistemaComponent;
  let fixture: ComponentFixture<CreateSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
