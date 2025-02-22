import React from 'react';
import PropTypes from 'prop-types';

import FooterFilter from './footer-filters';

function Footer({
  activeLeftCount,
  selectedFilter = 'all',
  handleFilter,
  clearComplete,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{activeLeftCount} items left</span>
      <ul className="filters">
        <FooterFilter
          selectedFilter={selectedFilter}
          handleFilter={handleFilter}
        />
      </ul>
      <button className="clear-completed" onClick={clearComplete} type="button">
        Clear completed
      </button>
    </footer>
  );
}
Footer.propTypes = {
  activeLeftCount: PropTypes.number.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  clearComplete: PropTypes.func.isRequired,
};

export default Footer;
