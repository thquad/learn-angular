import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodowidgetComponent } from './todo-widget.component';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoWidgetComponent', () => {
  let component: TodowidgetComponent;
  let fixture: ComponentFixture<TodowidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodowidgetComponent,
        MatInputModule,
        MatLabel,
        ReactiveFormsModule,
        TodoListComponent,
        AsyncPipe,
        MatCard,
        MatButton,
        BrowserAnimationsModule
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodowidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
