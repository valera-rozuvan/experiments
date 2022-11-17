import {v4 as uuidv4} from 'uuid';
import {handleActions, Action} from 'redux-actions';

import {Todo} from './model';
import {ActionTypes} from '../constants/ActionTypes';

const initialState: Todo[] = [{
  text: 'Use Redux with TypeScript',
  completed: false,
  id: uuidv4(),
}];

export const todosReducer = handleActions<Todo[], Todo>({
  [ActionTypes.ADD_TODO]: (state: Todo[], action: Action<Todo>): Todo[] => {
    return [{
      id: uuidv4(),
      completed: action.payload ? action.payload.completed : false,
      text: action.payload ? action.payload.text : ''
    }, ...state];
  },

  [ActionTypes.DELETE_TODO]: (state: Todo[], action: Action<Todo>): Todo[] => {
    return state.filter(todo =>
      action.payload && todo.id !== action.payload.id
    );
  },

  [ActionTypes.EDIT_TODO]: (state: Todo[], action: Action<Todo>): Todo[] => {
    return state.map(todo =>
      action.payload && todo.id === action.payload.id
        ? {...todo, text: action.payload.text}
        : todo
    );
  },

  [ActionTypes.COMPLETE_TODO]: (state: Todo[], action: Action<Todo>): Todo[] => {
    return state.map(todo =>
      action.payload && todo.id === action.payload.id ?
        {...todo, completed: !todo.completed} :
        todo
    );
  },

  [ActionTypes.COMPLETE_ALL]: (state: Todo[], action: Action<Todo>): Todo[] => {
    const areAllMarked = state.every(todo => todo.completed);
    return state.map(todo => ({
      ...todo,
      completed: !areAllMarked
    }));
  },

  [ActionTypes.CLEAR_COMPLETED]: (state: Todo[], action: Action<Todo>): Todo[] => {
    return state.filter(todo => !todo.completed);
  }
}, initialState);
