import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component
 */
const Header = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'header';

  return (
    <div className={baseCls}>
      <div className="header_inner">
        <Link className="header_title" to="/">MyTodos</Link>
      </div>
    </div>
  )
};

export default Header;
