import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editText: props.description,
    };
  }

  onEditTask = (e) => {
    e.stopPropagation();
    const { done, description } = this.props;
    if (done) {
      return;
    }
    this.setState({
      isEditing: true,
      editText: description,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  handleEditEnd = () => {
    const { onEditTask, id } = this.props;
    const { editText } = this.state;
    onEditTask(id, editText);
    this.setState({ isEditing: false });
  };

  onToogleCompleted = () => {
    const { onToggleActiveCount, id } = this.props;
    onToggleActiveCount(id);
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleEditEnd();
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.handleEditEnd();
  };

  render() {
    const {
      done,
      description,
      createdAt,
      onDeletedItem,
      id,
      timerMinut,
      timerSecond,
      onStopTimer,
      onStartTimer,
    } = this.props;
    const { isEditing, editText } = this.state;
    return (
      <li className={`${done ? 'completed' : ''}${isEditing ? 'editing' : ''}`}>
        <div className="view">
          <input
            id={`task-${id}`}
            className="toggle"
            type="checkbox"
            onChange={this.onToogleCompleted}
            checked={done}
          />
          {!isEditing ? (
            <label htmlFor={`task-${id}`}>
              <span
                className="title"
                onClick={this.onToogleCompleted}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    this.onToogleCompleted(e);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {description}
              </span>
              <span className="description">
                <button
                  type="button"
                  className="icon icon-play"
                  onClick={onStartTimer}
                  aria-label="Запустить таймер"
                />
                <button
                  type="button"
                  className="icon icon-pause"
                  onClick={onStopTimer}
                  aria-label="Остановить таймер"
                />
                {timerMinut}:{timerSecond}
              </span>
              <span className="created description">
                {`created ${formatDistanceToNow(createdAt, {
                  addSuffix: true,
                })} ago`}
              </span>
            </label>
          ) : null}
          <button
            type="button"
            className="icon icon-edit"
            onClick={this.onEditTask}
            aria-label="Edit task"
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeletedItem}
            aria-label="Delete task"
          />
        </div>
        {isEditing && (
          <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              className="edit"
              value={editText}
              onChange={this.handleDescriptionChange}
              onBlur={this.handleEditEnd}
              onClick={this.handleKeyPress}
            />
          </form>
        )}
      </li>
    );
  }
}
Task.propTypes = {
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  onEditTask: PropTypes.func.isRequired,
  onToggleActiveCount: PropTypes.func.isRequired,
  onDeletedItem: PropTypes.func.isRequired,
  timerMinut: PropTypes.number.isRequired,
  timerSecond: PropTypes.number.isRequired,
  onStopTimer: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
};
