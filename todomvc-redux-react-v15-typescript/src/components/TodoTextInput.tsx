import * as React from 'react';

const classNames = require('classnames');

interface TodoTextInputProps {
  onSave: (text: string) => void;
  text?: string;
  placeholder?: string,
  editing?: boolean;
  newTodo?: boolean;
}

interface TodoTextInputState {
  text: string;
}

class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState> {
  constructor(props: TodoTextInputProps, context: any) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    const text = (e.target as HTMLInputElement).value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({text: ''});
      }
    }
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({text: e.target.value});
  }

  handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!this.props.newTodo) {
      this.props.onSave((e.target as HTMLInputElement).value);
    }
  }

  render() {
    return (
      <input
        className={
          classNames({
            edit: this.props.editing,
            'new-todo': this.props.newTodo
          })
        }
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)}
      />
    );
  }
}


export default TodoTextInput;
