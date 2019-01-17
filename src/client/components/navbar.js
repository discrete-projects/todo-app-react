import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const anonFunc = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func,
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
const Navbar = ({ filterBy, onClickFilter, onArchiveAll }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'
  const innerCls = 'navbar_inner'

  let activeLinkCls = `${innerCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${innerCls}__item--active` : '';

  let completedLinkCls = `${innerCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${innerCls}__item--active` : '';
  
  let archivedLinkCls = `${innerCls}__item`;
  archivedLinkCls += filterBy === 'archived' ? ` ${innerCls}__item--completed` : '';

  return (
    <div className={baseCls}>
      <div className="navbar_inner">
        <NavLink
          to="/"
          activeClassName={`${innerCls}__item--active`}
          className={`${innerCls}__item`}
          onClick={() => onClickFilter('')}
        >
          All
        </NavLink>
        <NavLink
          to="/active"
          activeClassName={`${innerCls}__item--active`}
          className={activeLinkCls}
          onClick={() => onClickFilter('active')}
        >
          Active
        </NavLink>
        <NavLink
          to="/completed"
          activeClassName={`${innerCls}__item--active`}
          className={completedLinkCls}
          onClick={() => onClickFilter('completed')}
        >
          Completed
        </NavLink>
        <NavLink
          to="/archived"
          activeClassName={`${innerCls}__item--active`}
          className={archivedLinkCls}
          onClick={() => onClickFilter('archived')}
        >
          Archived
        </NavLink>
        <NavLink
          to="/"
          activeClassName={`${innerCls}__item--active`}
          className="navbar_archive-completed"
          onClick={onArchiveAll}
        >
          Archive all completed
        </NavLink>
      </div>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
