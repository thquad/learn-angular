import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEntityPageComponent } from './todo-entity-page.component';
import { AsyncPipe } from '@angular/common';
import { TodowidgetComponent } from '@shared/component/todo-widget/todo-widget.component';
import { provideState, provideStore } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { todoEntityFeature } from './store/todo-entity.feature';

describe('TodoEntityPageComponent', () => {
  let component: TodoEntityPageComponent;
  let fixture: ComponentFixture<TodoEntityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoEntityPageComponent,
        TodowidgetComponent,
        AsyncPipe,
        BrowserAnimationsModule
      ],
      providers: [
        provideStore(),
        provideState(todoEntityFeature)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoEntityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
