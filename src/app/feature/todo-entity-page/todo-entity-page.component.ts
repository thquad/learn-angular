import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TodoItem } from '../../shared/model/todo.model';
import { TodowidgetComponent } from '../../shared/component/todo-widget/todo-widget.component';
import { selectAllAsSortedArray } from './store/todo-entity.feature';
import { TodoEntityActions } from './store/todo-entity.actions';

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

  todoList$ = this.store.select(selectAllAsSortedArray);

  onSubmit(todoItem: TodoItem): void {
    this.store.dispatch(TodoEntityActions.postTodo({
      data: todoItem
    }));
  }

  onDelete(todoItem: TodoItem): void {
    this.store.dispatch(TodoEntityActions.deleteTodo({ data: todoItem }));
  }

  onReset(): void {
    this.store.dispatch(TodoEntityActions.resetList());
  }
}
