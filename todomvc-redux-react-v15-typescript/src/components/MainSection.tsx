import * as React from 'react';

import {Todo} from '../stateManagement/model';
import {
  TodoItem,
  Footer,
} from './index';
import {TodoFilters} from '../constants/TodoFilters';

const TODO_FILTERS = {
  [TodoFilters.SHOW_ALL]: () => true,
  [TodoFilters.SHOW_ACTIVE]: (todo: Todo) => !todo.completed,
  [TodoFilters.SHOW_COMPLETED]: (todo: Todo) => todo.completed,
};

interface MainSectionProps {
  todos: Todo[];
  clearCompleted: () => void;
  completeAll: () => void;
  editTodo: (todo: Todo, text: string) => void;
  completeTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

interface MainSectionState {
  filter: TodoFilters;
}

class MainSection extends React.Component<MainSectionProps, MainSectionState> {
  constructor(props: MainSectionProps, context: any) {
    super(props, context);
    this.state = {filter: TodoFilters.SHOW_ALL};
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.clearCompleted();
    }
  }

  handleShow(filterStr: string) {
    const filter = filterStr as TodoFilters;
    this.setState({filter});
  }

  renderToggleAll(completedCount: number) {
    const {todos, completeAll} = this.props;
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={() => completeAll()}
        />
      );
    }
  }

  renderFooter(completedCount: number) {
    const {todos} = this.props;
    const {filter} = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted.bind(this)}
          onShow={this.handleShow.bind(this)}
        />
      );
    }
  }

  render() {
    const {todos, completeTodo, deleteTodo, editTodo} = this.props;
    const {filter} = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce(
      (count: number, todo): number => todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={editTodo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

export default MainSection;
