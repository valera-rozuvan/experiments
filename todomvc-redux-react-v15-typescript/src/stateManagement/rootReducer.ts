import {combineReducers} from 'redux';

import {AppState} from "./model";
import {todosReducer} from './todosReducer';

export const rootReducer = combineReducers<AppState>({
  todos: todosReducer,
});
