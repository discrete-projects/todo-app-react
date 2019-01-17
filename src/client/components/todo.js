import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const anonFunc = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onClickTodo: PropTypes.func,
  onClickArchive: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.string,
  isChecked: PropTypes.bool,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: anonFunc,
  onClickTodo: anonFunc,
  onClickArchive: anonFunc,
  status: '',
  text: '',
  isChecked: false,
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickTodo, onClickArchive, status, text, archive, isChecked }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');

  
  (status === 'complete' ? isChecked = true : isChecked = false);
  
  const onChange = () => {

  }

  return (
    <li className={todoCls}>
      <span className="todo_inner" onClick={onClickTodo}>
        <label className="todo_checkbox-wrap">
          <input type="checkbox" checked={isChecked} readOnly/>
          <span className="todo_checkbox"></span>
        </label>
        <TodoLink text={text}  />
      </span>
      <button className="todo_archive-btn" onClick={onClickArchive}>Archive</button>
      <button className="todo_close-btn" onClick={onClickDelete} />
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
