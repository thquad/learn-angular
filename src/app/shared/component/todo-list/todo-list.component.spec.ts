import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoItem } from '@shared/model/todo.model';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoItem: TodoItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoListComponent,
        MatIconModule,
        MatIconButton,
        CommonModule,
        MatCard,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinner
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    todoItem = {
      id: '1',
      text: 'test'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onEditToggle should add and remove todo from editTodo array', () => {
    expect(component.editTodo).toHaveSize(0);
    component.onEditToggle(todoItem);
    expect(component.editTodo).toHaveSize(1);
    component.onEditToggle(todoItem);
    expect(component.editTodo).toHaveSize(0);
  });
});
