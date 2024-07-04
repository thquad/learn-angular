import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEntityPageComponent } from './todo-entity-page.component';

describe('TodoEntityPageComponent', () => {
  let component: TodoEntityPageComponent;
  let fixture: ComponentFixture<TodoEntityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoEntityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoEntityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
