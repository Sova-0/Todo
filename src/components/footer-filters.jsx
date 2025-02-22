import React from 'react';
import PropTypes from 'prop-types';

// function FooterFilter({ selectedFilter = 'all', handleFilter }) {
function FooterFilter({ selectedFilter = 'all', handleFilter }) {
  return (
    <div>
      <ul className="filters">
        <li>
          <button
            type="button"
            className={selectedFilter === 'all' ? 'selected' : ''}
            onClick={() => handleFilter('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={selectedFilter === 'active' ? 'selected' : ''}
            onClick={() => handleFilter('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={selectedFilter === 'completed' ? 'selected' : ''}
            onClick={() => handleFilter('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
}

FooterFilter.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default FooterFilter;
