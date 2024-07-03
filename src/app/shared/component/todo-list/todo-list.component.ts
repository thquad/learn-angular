import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../model/todo.model';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { slideEnterLeaveTrigger } from '../../animation/animations';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatIconButton, CommonModule, MatCard],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  animations: [slideEnterLeaveTrigger]
})
export class TodoListComponent {
  @Input() items!: TodoItem[];
  @Output() deleteEvent = new EventEmitter<TodoItem>();

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

  onDelete(todoItem: TodoItem): void {
    this.toLeave.push(todoItem);
    this.deleteEvent.emit(todoItem);
  }
}
