import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import Subnav from './subnav';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    console.log('>>>>>', + props);
    this.state = {
      todos: [],
      filterBy: null,
      // filterBy: props.location.pathname.slice(1) //update for routing
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);

    this.onClickComplete = this.onClickComplete.bind(this);
    this.updateSingleTodo = this.updateSingleTodo.bind(this);
    this.onClickArchive = this.onClickArchive.bind(this);
    this.onClickArchiveAll = this.onClickArchiveAll.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    console.log('addTodo', { text })
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    console.log('postTodo', [...json])
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
 * Update todos array state
 *
 * @param  {Array} todos - Array of todo objects
 */
  updateTodos(todos) {
    console.log('updateTodos', todos)
    this.setState({ todos });
  }

  updateSingleTodo(todo) {
    console.log('updateSingleTodo')
    let idx = this.state.todos.findIndex(cur => cur.id === todo.id);
    this.setState({
      todos: [
        ...this.state.todos.slice(0, idx),
        todo,
        ...this.state.todos.slice(idx + 1),
      ]
    })
  }

  /* PRIMARY NAVIGATION FUNCTIONS */
  onClickComplete() {
    const updateTodos = [...this.state.todos.filter(todo => todo.status !== 'complete')]
    updateTodos.map(todo => {
      todo.status = 'complete'
      api('PUT', todo, this.updateSingleTodo)
    })
  }

  /*click archive function*/
  onClickArchive() {
    const updateTodos = [...this.state.todos.filter(todo => todo.archive !== false)]
    updateTodos.map(todo => {
      todo.archive = true;
      api('PUT', todo, this.updateSingleTodo);
    })
  }

  /*click archive all function*/
  onClickArchiveAll() {
    const newTodos = [...this.state.todos]
    newTodos.map(todo => {
      if (todo.archive === false && todo.status === 'complete') {
        todo.archive = true
        api('PUT', todo, this.updateSingleTodo)
      }
    })
  }
  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    let activeTodos = this.state.todos;
    let activeTodosArr = Object.keys(activeTodos).map((idx) => {
      return activeTodos[idx];
    });

    let activeNum = activeTodosArr.filter(todo => todo.status === 'active');

    return (
      <div className={this.baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} onArchiveAll={this.onClickArchiveAll} />
        <Subnav onClickComplete={this.onClickComplete} activeTodos={activeNum} />

        <div className='todo_wrapper'>
          <TodoForm onSubmit={this.addTodo} />

          <Todos
            filterBy={this.state.filterBy}
            todos={this.state.todos}
            updateTodos={this.updateTodos}
          />
        </div>
      </div>
    );
  }
}

export default TodosPage;
