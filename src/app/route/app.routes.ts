import { Routes } from '@angular/router';
import { TodoWidgetComponent } from '../component/todo/todo-widget/todo-widget.component';
import { PATH } from '../model/path.model';

export const routes: Routes = [
  {
    path: '',
    redirectTo: PATH.TODO_LIST,
    pathMatch: 'full'
  },
  {
    path: PATH.TODO_LIST,
    component: TodoWidgetComponent
  }
];
