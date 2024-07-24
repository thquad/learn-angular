type Navigation = {
  name: string,
  path: PATH
}

export enum PATH {
  TODO_LIST = 'todo-list',
  TODO_LIST_BASIC = 'todo-list/basic',
  TODO_LIST_ENTITY = 'todo-list/entity',
  FORMS = 'forms',
  SIGNALS = 'signals',
}

export const NAVIGATION: Navigation[] = [
  {
    name: 'Basic NgRx',
    path: PATH.TODO_LIST_BASIC
  },
  {
    name: 'Entitiy NgRx',
    path: PATH.TODO_LIST_ENTITY
  },
  {
    name: 'Forms',
    path: PATH.FORMS
  },
  {
    name: 'Signals',
    path: PATH.SIGNALS
  }
]