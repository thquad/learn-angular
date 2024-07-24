import { TodoItem } from "@shared/model/todo.model";

export function createTodoPrefillItems(): TodoItem[] {
  return [
    { id: `${new Date().getTime()}1`, text: 'take out trash' },
    { id: `${new Date().getTime()}2`, text: 'feed cat' },
    { id: `${new Date().getTime()}3`, text: 'pay debt' },
    { id: `${new Date().getTime()}4`, text: 'run for president' },
    { id: `${new Date().getTime()}5`, text: 'order food' },
  ];
}