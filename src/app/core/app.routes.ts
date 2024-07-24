import { Routes } from '@angular/router';
import { PATH } from '@shared/model/path.model';
import { TodoPageComponent } from '@feature/todo-page/todo-page.component';
import { TodoEntityPageComponent } from '@feature/todo-entity-page/todo-entity-page.component';
import { FormsPageComponent } from '@feature/forms-page/forms-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: PATH.TODO_LIST_BASIC,
    pathMatch: 'full'
  },
  {
    path: PATH.TODO_LIST_BASIC,
    component: TodoPageComponent
  },
  {
    path: PATH.TODO_LIST_ENTITY,
    component: TodoEntityPageComponent
  },
  {
    path: PATH.FORMS,
    component: FormsPageComponent
  }
];
