import {createAction} from 'redux-actions';

import {Todo} from './model';
import {ActionTypes} from '../constants/ActionTypes';

const addTodo = createAction<Todo, string>(
  ActionTypes.ADD_TODO,
  (text: string) => ({text, completed: false})
);

const deleteTodo = createAction<Todo, Todo>(
  ActionTypes.DELETE_TODO,
  (todo: Todo) => todo
);

const editTodo = createAction<Todo, Todo, string>(
  ActionTypes.EDIT_TODO,
  (todo: Todo, newText: string) => ({...todo, text: newText})
);

const completeTodo = createAction<Todo, Todo>(
  ActionTypes.COMPLETE_TODO,
  (todo: Todo) => todo
)

const completeAll = createAction<void>(
  ActionTypes.COMPLETE_ALL,
  () => {
  }
)

const clearCompleted = createAction<void>(
  ActionTypes.CLEAR_COMPLETED,
  () => {
  }
);

export {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAll,
  clearCompleted
}
