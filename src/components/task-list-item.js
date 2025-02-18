import React from "react";
import { formatDistanceToNow } from "date-fns";

export default class Task extends React.Component {

  onToogleCompleted = (event) => {
      this.props.onToggleActiveCount(this.props.id);
  };
  
  render() {
    return (
      <li className={this.props.done ? 'completed' : ''}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this.onToogleCompleted}
            checked={this.props.done}
          />
          <label>
            <span className="description">{this.props.description}</span>
            <span className="created">{`created ${formatDistanceToNow(this.props.createdAt)} ago`}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={this.props.onDeletedItem}
          ></button>
        </div>
      </li>
    );
  }
}
