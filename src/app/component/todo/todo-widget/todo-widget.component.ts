import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoInputComponent } from '../todo-input/todo-input.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { Store } from '@ngrx/store';
import { TodoActions } from '../../../store/todo/todo.actions';
import { selectTodoList } from '../../../store/todo/todo.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrl: './todo-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, TodoInputComponent, TodoListComponent, AsyncPipe],
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
