import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoInputComponent } from '../todo-input/todo-input.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { Store } from '@ngrx/store';
import { typePropertyIsNotAllowedInProps } from '@ngrx/store/src/models';
import { TodoActions } from '../../../state/todo/todo.actions';
import { selectTodoList } from '../../../state/todo/todo.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-widget',
  standalone: true,
  imports: [ReactiveFormsModule, TodoInputComponent, TodoListComponent, AsyncPipe],
  templateUrl: './todo-widget.component.html',
  styleUrl: './todo-widget.component.scss'
})
export class TodoWidgetComponent {
  fb = inject(FormBuilder);
  store = inject(Store);

  todoList$ = this.store.select(selectTodoList);

  form = this.fb.group({
    todoInput: this.fb.control('')
  })

  get todoInput() {
    return this.form.get('todoInput') as FormControl<string>;
  }

  onSubmit() {
    this.store.dispatch(TodoActions.postTodo({data:{
      text: `${this.form.controls.todoInput.value}`,
      id: `${new Date().getTime()}`
    }}));
    this.form.controls.todoInput.setValue('');
  }
}
