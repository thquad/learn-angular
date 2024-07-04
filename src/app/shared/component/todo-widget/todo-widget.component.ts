import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { TodoItem } from '../../model/todo.model';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrl: './todo-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatInputModule, MatLabel, ReactiveFormsModule, TodoListComponent, AsyncPipe, MatCard, MatButton],
})
export class TodowidgetComponent {
  fb = inject(FormBuilder);

  @Input() headline!: string;
  @Input() todoList!: TodoItem[];
  @Output() submitEvent = new EventEmitter<TodoItem>();
  @Output() deleteEvent = new EventEmitter<TodoItem>();
  @Output() resetEvent = new EventEmitter();


  form = this.fb.group({
    todoInput: this.fb.control('')
  })

  get todoInput() {
    return this.form.get('todoInput') as FormControl<string>;
  }

  onSubmit(): void {
    let todoItem: TodoItem = {
      text: `${this.form.controls.todoInput.value}`,
      id: `${new Date().getTime()}`
    };

    this.submitEvent.emit(todoItem);

    this.form.controls.todoInput.setValue('');
  }

  onDelete(todoItem: TodoItem): void {
    this.deleteEvent.emit(todoItem);
  }

  onReset(): void {
    this.resetEvent.emit();
  }
}
