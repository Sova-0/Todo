import React, { Component } from "react";

import Task from "./task-list-item";
import PropTypes from "prop-types";

export default class TaskList extends Component {
  render() {
    // DEFAULT PROPS
    TaskList.defaultProps = {
      todos: [
        {
          description: 'Default Task',
          done: false
        }
      ]
    }
    // @ts-ignore
    TaskList.propTypes = {
      todos: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          description: PropTypes.string,
          done: PropTypes.bool
        })
      ),
      onDeleted: PropTypes.func,
      onToggleActiveCount: PropTypes.func
    }
    const { todos, onDeleted, onToggleActiveCount} = this.props;
    return (
      <ul className="todo-list">
        {todos.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              description={task.description}
              createdAt={task.createdAt}
              status={task.status}
              done={task.done}
              onDeletedItem={() => onDeleted(task.id)}
              onToggleActiveCount={onToggleActiveCount}
              
            />
          );
        })}
      </ul>
    );
  }
}
