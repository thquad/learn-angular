import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TodoActions } from './store/todo.actions';
import { selectSortedTodoList } from './store/todo.feature';
import { TodoItem } from '@shared/model/todo.model';
import { TodowidgetComponent } from '@shared/component/todo-widget/todo-widget.component';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TodowidgetComponent, AsyncPipe],
})
export class TodoPageComponent {
  store = inject(Store);

  todoList$ = this.store.select(selectSortedTodoList);

  onSubmit(todoItem: TodoItem): void {
    this.store.dispatch(TodoActions.postTodo({
      data: todoItem
    }));
  }

  onEdit(todoItem: TodoItem): void {
    this.store.dispatch(TodoActions.putTodo({ data: todoItem }));
  }

  onDelete(todoItem: TodoItem): void {
    this.store.dispatch(TodoActions.deleteTodo({ data: todoItem }));
  }

  onReset(): void {
    this.store.dispatch(TodoActions.resetList());
  }
}
