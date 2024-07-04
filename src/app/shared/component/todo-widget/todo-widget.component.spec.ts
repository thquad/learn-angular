import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodowidgetComponent } from './todo-widget.component';

describe('TodoWidgetComponent', () => {
  let component: TodowidgetComponent;
  let fixture: ComponentFixture<TodowidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodowidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodowidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
