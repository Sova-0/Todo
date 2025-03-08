import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      timerMinut: 0,
      timerSecond: 0,
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinutChange = (e) => {
    this.setState({
      timerMinut: e.target.value,
    });
  };

  onSecondChange = (e) => {
    this.setState({
      timerSecond: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onAdd } = this.props;
    const { label, timerMinut, timerSecond } = this.state;
    onAdd(label, timerMinut, timerSecond);
    this.setState({
      label: '',
      timerMinut: 0,
      timerSecond: 0,
    });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  // УДАЛЕНИЕ и ВОЗВРАЩЕНИЕ 0 ПРИ КЛИКЕ НА MIN и SEC
  handleBlur = (field) => {
    const { [field]: value } = this.state;
    if (value === '') {
      this.setState({ [field]: 0 });
    }
  };

  render() {
    const { label, timerMinut, timerSecond } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="Task"
          onChange={this.onLabelChange}
          value={label}
          onKeyDown={this.onKeyDown}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          onKeyDown={this.onKeyDown}
          value={timerMinut}
          onChange={this.onMinutChange}
          onBlur={() => this.handleBlur('timerMinut')}
          onFocus={() => this.setState({ timerMinut: '' })}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          onKeyDown={this.onKeyDown}
          value={timerSecond}
          onChange={this.onSecondChange}
          onBlur={() => this.handleBlur('timerSecond')}
          onFocus={() => this.setState({ timerSecond: '' })}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
