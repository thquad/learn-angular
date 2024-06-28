import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from '../../shared/component/todo-list/todo-list.component';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoActions } from './store/todo.actions';
import { selectSortedTodoList } from './store/todo.feature';
import { TodoItem } from '../../shared/model/todo.model';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatInputModule, MatLabel, ReactiveFormsModule, TodoListComponent, AsyncPipe],
})
export class TodoPageComponent {
  fb = inject(FormBuilder);
  store = inject(Store);

  todoList$ = this.store.select(selectSortedTodoList);

  form = this.fb.group({
    todoInput: this.fb.control('')
  })

  get todoInput() {
    return this.form.get('todoInput') as FormControl<string>;
  }

  onSubmit(): void {
    this.store.dispatch(TodoActions.postTodo({data:{
      text: `${this.form.controls.todoInput.value}`,
      id: `${new Date().getTime()}`
    }}));
    this.form.controls.todoInput.setValue('');
  }

  onDelete(todoItem: TodoItem): void {
    this.store.dispatch(TodoActions.deleteTodo({data: todoItem}));
  }
}
