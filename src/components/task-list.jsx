import PropTypes from 'prop-types';
import Task from './task-list-item';

function TaskList({ todos = [], onDeleted, onToggleActiveCount, onEditTask }) {
  return (
    <ul className="todo-list">
      {todos.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          createdAt={task.createdAt}
          status={task.status}
          done={task.done}
          onDeletedItem={() => onDeleted(task.id)}
          onToggleActiveCount={onToggleActiveCount}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}
// Prop types
TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      done: PropTypes.bool,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleActiveCount: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default TaskList;
