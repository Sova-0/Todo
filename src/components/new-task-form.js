import React, { Component } from "react";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label)
    this.setState({
      label: ''
    })
  }
  render() {
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        ></input>
      </form>
    );
  }
}
