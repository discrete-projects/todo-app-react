import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const anonFunc = () => {};


/**
 * Prop Types
 * @private
 */
const propTypes = {
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: anonFunc,
};


/**
 * Navbar component
 * @returns {ReactElement}
 */
const Subnav = ({ activeTodos, onClickComplete }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'subnav'

  return (
    <div className={baseCls}>
      <span>{activeTodos.length} tasks remaining</span>
      <button onClick={onClickComplete}>Complete All</button>
    </div>
  );
}

Subnav.propTypes = propTypes;
Subnav.defaultProps = defaultProps;

export default Subnav;
