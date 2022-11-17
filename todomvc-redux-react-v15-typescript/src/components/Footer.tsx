import * as React from 'react';

const classNames = require('classnames');

import {TodoFilters} from '../constants/TodoFilters';

const FILTER_TITLES = {
  [TodoFilters.SHOW_ALL]: 'All',
  [TodoFilters.SHOW_ACTIVE]: 'Active',
  [TodoFilters.SHOW_COMPLETED]: 'Completed',
};

interface FooterProps {
  completedCount: number;
  activeCount: number;
  filter: string;
  onClearCompleted: () => void;
  onShow: (filter: string) => void;
}

class Footer extends React.Component<FooterProps, {}> {
  renderTodoCount() {
    const {activeCount} = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: TodoFilters) {
    const title = FILTER_TITLES[filter];
    const {filter: selectedFilter, onShow} = this.props;

    return (
      <a className={classNames({selected: filter === selectedFilter})}
         style={{cursor: 'pointer'}}
         onClick={() => onShow(filter)}>
        {title}
      </a>
    );
  }

  renderClearButton() {
    const {completedCount, onClearCompleted} = this.props;
    if (completedCount > 0) {
      return (
        <button
          className="clear-completed"
          onClick={() => onClearCompleted()}>
          Clear completed
        </button>
      );
    }
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[TodoFilters.SHOW_ALL, TodoFilters.SHOW_ACTIVE, TodoFilters.SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

export default Footer;
