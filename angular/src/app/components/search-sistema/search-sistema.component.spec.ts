import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSistemaComponent } from './search-sistema.component';

describe('SearchSistemaComponent', () => {
  let component: SearchSistemaComponent;
  let fixture: ComponentFixture<SearchSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
