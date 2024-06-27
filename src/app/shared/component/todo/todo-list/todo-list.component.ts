import { Component, Input } from '@angular/core';
import { TodoItem } from '../../../model/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() items!: TodoItem[];
}
