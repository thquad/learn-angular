import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TodoItem } from '../../shared/model/todo.model';
import { TodowidgetComponent } from '../../shared/component/todo-widget/todo-widget.component';
import { selectSortedTodoList } from '../todo-page/store/todo.feature';
import { TodoActions } from '../todo-page/store/todo.actions';

@Component({
  selector: 'app-todo-entity-page',
  templateUrl: './todo-entity-page.component.html',
  styleUrl: './todo-entity-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TodowidgetComponent, AsyncPipe],
})
export class TodoEntityPageComponent {
  store = inject(Store);

  todoList$ = this.store.select(selectSortedTodoList);

  onSubmit(todoItem: TodoItem): void {
    this.store.dispatch(TodoActions.postTodo({
      data: todoItem
    }));
  }

  onDelete(todoItem: TodoItem): void {
    this.store.dispatch(TodoActions.deleteTodo({ data: todoItem }));
  }

  onReset(): void {
    this.store.dispatch(TodoActions.resetList());
  }
}
