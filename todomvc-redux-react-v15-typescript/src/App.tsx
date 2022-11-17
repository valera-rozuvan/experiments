import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as React from 'react';

import {
  Header,
  MainSection,
} from './components';
import {Todo, AppState} from './stateManagement/model';
import {
  addTodo,
  editTodo,
  clearCompleted,
  completeAll,
  completeTodo,
  deleteTodo,
} from './stateManagement';

interface AppProps {
  todos: Todo[];
  dispatch: Dispatch<AppState>;
}

class App extends React.Component<AppProps, AppState> {
  render() {
    const {todos, dispatch} = this.props;

    return (
      <div className="todoapp">
        <Header addTodo={(text: string) => dispatch(addTodo(text))}/>
        <MainSection
          todos={todos}
          editTodo={(todo: Todo, text: string) => dispatch(editTodo(todo, text))}
          deleteTodo={(todo: Todo) => dispatch(deleteTodo(todo))}
          completeTodo={(todo: Todo) => dispatch(completeTodo(todo))}
          clearCompleted={() => dispatch(clearCompleted())}
          completeAll={() => dispatch(completeAll())}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
