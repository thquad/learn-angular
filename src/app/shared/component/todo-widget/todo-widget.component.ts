import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { TodoItem } from '../../model/todo.model';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrl: './todo-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    TodoListComponent,
    AsyncPipe,
    MatCard,
    MatButton
  ],
})
export class TodowidgetComponent {
  private fb = inject(FormBuilder);

  @Input() headline!: string;
  @Input() todoList!: TodoItem[];
  @Output() submitEvent = new EventEmitter<TodoItem>();
  @Output() editEvent = new EventEmitter<TodoItem>();
  @Output() deleteEvent = new EventEmitter<TodoItem>();
  @Output() resetEvent = new EventEmitter();

  public todoInput = this.fb.control('');

  onSubmit(): void {
    let todoItem: TodoItem = {
      text: `${this.todoInput.value}`,
      id: `${new Date().getTime()}`
    };

    this.submitEvent.emit(todoItem);

    this.todoInput.setValue('');
  }

  onEdit(todoItem: TodoItem): void {
    this.editEvent.emit(todoItem);
  }

  onDelete(todoItem: TodoItem): void {
    this.deleteEvent.emit(todoItem);
  }

  onReset(): void {
    this.resetEvent.emit();
  }
}
