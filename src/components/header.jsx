import React from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from './new-task-form';

function Header({ onAdd }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAdd={onAdd} />
    </header>
  );
}

Header.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Header;
