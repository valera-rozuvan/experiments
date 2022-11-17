import * as React from 'react';

const classNames = require('classnames');

import {Todo} from '../stateManagement/model';
import {TodoTextInput} from './index';

interface TodoItemProps {
  todo: Todo;
  editTodo: (todo: Todo, text: string) => void;
  deleteTodo: (todo: Todo) => void;
  completeTodo: (todo: Todo) => void;
  key?: any;
}

interface TodoItemState {
  editing: boolean;
}

class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  constructor(props: TodoItemProps, context: any) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({editing: true});
  }

  handleSave(todo: Todo, text: string) {
    if (text.length === 0) {
      this.props.deleteTodo(todo);
    } else {
      this.props.editTodo(todo, text);
    }
    this.setState({editing: false});
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo, text)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo)}
          />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button
            className="destroy"
            onClick={() => deleteTodo(todo)}
          />
        </div>
      );
    }

    return (
      <li className={classNames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
}

export default TodoItem;
