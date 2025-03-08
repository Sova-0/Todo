import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      taimerMinut: 0,
      taimerSecond: 0,
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinutChange = (e) => {
    this.setState({
      taimerMinut: e.target.value,
    });
  };

  onSecondChange = (e) => {
    this.setState({
      taimerSecond: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onAdd } = this.props;
    const { label, taimerMinut, taimerSecond } = this.state;
    onAdd(label, taimerMinut, taimerSecond);
    this.setState({
      label: '',
      taimerMinut: 0,
      taimerSecond: 0,
    });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  // УДАЛЕНИЕ и ВОЗВРАЩЕНИЕ 0 ПРИ КЛИКЕ НА MIN и SEC
  handleBlur = (field) => {
    if (this.state[field] === '') {
      this.setState({ [field]: 0 });
    }
  };

  render() {
    const { label, taimerMinut, taimerSecond } = this.state;
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
          value={taimerMinut}
          onChange={this.onMinutChange}
          onBlur={() => this.handleBlur('taimerMinut')}
          onFocus={() => this.setState({taimerMinut: ''})}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          onKeyDown={this.onKeyDown}
          value={taimerSecond}
          onChange={this.onSecondChange}
          onBlur={() => this.handleBlur('taimerSecond')}
          onFocus={() => this.setState({taimerSecond: ''})}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
