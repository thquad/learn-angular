import { Routes } from '@angular/router';
import { PATH } from '../shared/model/path.model';
import { todoPageRoutes } from '../feature/todo-page/todo-page.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: PATH.TODO_LIST,
    pathMatch: 'full'
  },
  {
    path: PATH.TODO_LIST,
    children: todoPageRoutes
  }
];
