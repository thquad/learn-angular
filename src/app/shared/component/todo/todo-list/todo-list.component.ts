import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../../model/todo.model';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatIconModule, MatIconButton],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() items!: TodoItem[];
  @Output() deleteEvent = new EventEmitter<TodoItem>();

  onDelete(todoItem: TodoItem): void {
    this.deleteEvent.emit(todoItem);
  }
}
