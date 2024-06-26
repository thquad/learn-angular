import { Routes } from '@angular/router';
import { PATH } from '../model/path.model';
import { TodoWidgetComponent } from '../component/todo/todo-widget/todo-widget.component';

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
