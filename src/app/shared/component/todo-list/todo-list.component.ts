import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../model/todo.model';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { slideEnterLeaveTrigger } from '../../animation/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatIconButton, CommonModule, MatCard, MatFormFieldModule, MatInputModule, MatProgressSpinner],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  animations: [slideEnterLeaveTrigger]
})
export class TodoListComponent {
  private _items!: TodoItem[];
  @Input() set items (items: TodoItem[]){
    this.loadingTodo = [];
    this._items = items;
  }
  get items() {
    return this._items;
  }
  @Output() deleteEvent = new EventEmitter<TodoItem>();
  @Output() editEvent = new EventEmitter<TodoItem>();

  public editTodo: TodoItem[] = [];
  public loadingTodo: TodoItem[] = [];

  // for animation states
  private toEnter: TodoItem[] = [];
  private toLeave: TodoItem[] = [];

  // for animation states
  animate(todoItem: TodoItem){
    /**
     * Since the whole item list is refreshed, all items in the list
     * will be animated with any changes, since the whole list is
     * rendered again.
     * Storing the id of already viewed items prevents animations
     * from repeated playing.
     */
    let state = '';

    if(!this.toEnter.some(item => item.id === todoItem.id)){
      this.toEnter.push(todoItem);
      state = 'enter'; 
    }

    if(this.toLeave.some(item => item.id === todoItem.id)){
      this.toEnter.push(todoItem);
      state = 'leave'; 
    }

    return state;
  }

  isEditMode(todoItem: TodoItem) {
    return this.editTodo.find(item => item.id === todoItem.id);
  }

  isLoading(todoItem: TodoItem) {
    return this.loadingTodo.find(item => item.id === todoItem.id);
  }

  onEditToggle(todoItem: TodoItem): void {
    if(this.editTodo.find(item => item.id === todoItem.id)){
      this.editTodo = this.editTodo.filter(item => item.id !== todoItem.id);
    } else {
      this.editTodo.push(todoItem);
    }
  }

  onEdit(value: string, todoItem: TodoItem) {
    this.editTodo = this.editTodo.filter(item => item.id !== todoItem.id);
    this.loadingTodo.push(todoItem);
    this.editEvent.emit({
      ...todoItem,
      text: value
    });
  }

  onDelete(todoItem: TodoItem): void {
    this.editTodo = this.editTodo.filter(item => item.id !== todoItem.id);
    this.toLeave.push(todoItem);
    this.deleteEvent.emit(todoItem);
  }
}
