import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPageComponent } from './todo-page.component';
import { TodowidgetComponent } from '@shared/component/todo-widget/todo-widget.component';
import { AsyncPipe } from '@angular/common';
import { provideState, provideStore } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { todoFeature } from './store/todo.feature';

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoPageComponent,
        TodowidgetComponent,
        AsyncPipe,
        BrowserAnimationsModule
      ],
      providers:[
        provideStore(),
        provideState(todoFeature)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
