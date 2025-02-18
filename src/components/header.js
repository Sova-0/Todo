import React from "react";
import NewTaskForm from "./new-task-form";
import PropTypes from "prop-types";

const Header = ({ onAdd }) => {
  // 
  Header.propTypes = {
    onAdd: PropTypes.func.isRequired,
  }
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAdd={onAdd}/>
    </header>
  );
};

export default Header;