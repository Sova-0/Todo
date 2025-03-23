import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ onAdd }) {
  const [label, setLabel] = useState('');
  const [timerMinut, setTimerMinut] = useState(0);
  const [timerSecond, setTimerSecond] = useState(0);

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinutChange = (e) => {
    setTimerMinut(e.target.value);
  };

  const onSecondChange = (e) => {
    setTimerSecond(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(label, timerMinut, timerSecond);
    setLabel('');
    setTimerMinut(0);
    setTimerSecond(0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  // УДАЛЕНИЕ и ВОЗВРАЩЕНИЕ 0 ПРИ КЛИКЕ НА MIN и SEC
  const handleBlur = (field) => {
    if (field === 'timerMinut' && timerMinut === '') {
      setTimerMinut(0);
    }
    if (field === 'timerSecond' && timerSecond === '') {
      setTimerSecond(0);
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="Task"
        onChange={onLabelChange}
        value={label}
        onKeyDown={onKeyDown}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        onKeyDown={onKeyDown}
        value={timerMinut}
        onChange={onMinutChange}
        onBlur={() => handleBlur('timerMinut')}
        onFocus={() => setTimerMinut('')}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        onKeyDown={onKeyDown}
        value={timerSecond}
        onChange={onSecondChange}
        onBlur={() => handleBlur('timerSecond')}
        onFocus={() => setTimerSecond('')}
      />
    </form>
  );
}

export default NewTaskForm;

// export default class NewTaskForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     label: '',
  //     timerMinut: 0,
  //     timerSecond: 0,
  //   };
  // }

  // onLabelChange = (e) => {
  //   this.setState({
  //     label: e.target.value,
  //   });
  // };

  // onMinutChange = (e) => {
  //   this.setState({
  //     timerMinut: e.target.value,
  //   });
  // };

  // onSecondChange = (e) => {
  //   this.setState({
  //     timerSecond: e.target.value,
  //   });
  // };

  // onSubmit = (e) => {
  //   e.preventDefault();
  //   const { onAdd } = this.props;
  //   const { label, timerMinut, timerSecond } = this.state;
  //   onAdd(label, timerMinut, timerSecond);
  //   this.setState({
  //     label: '',
  //     timerMinut: 0,
  //     timerSecond: 0,
  //   });
  // };

  // onKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     this.onSubmit(e);
  //   }
  // };

  // УДАЛЕНИЕ и ВОЗВРАЩЕНИЕ 0 ПРИ КЛИКЕ НА MIN и SEC
  // handleBlur = (field) => {
  //   const { [field]: value } = this.state;
  //   if (value === '') {
  //     this.setState({ [field]: 0 });
  //   }
  // };

//   render() {
//     const { label, timerMinut, timerSecond } = this.state;
//     return (
//       <form className="new-todo-form" onSubmit={this.onSubmit}>
//         <input
//           type="text"
//           className="new-todo"
//           placeholder="Task"
//           onChange={this.onLabelChange}
//           value={label}
//           onKeyDown={this.onKeyDown}
//         />
//         <input
//           type="number"
//           className="new-todo-form__timer"
//           placeholder="Min"
//           onKeyDown={this.onKeyDown}
//           value={timerMinut}
//           onChange={this.onMinutChange}
//           onBlur={() => this.handleBlur('timerMinut')}
//           onFocus={() => this.setState({ timerMinut: '' })}
//         />
//         <input
//           type="number"
//           className="new-todo-form__timer"
//           placeholder="Sec"
//           onKeyDown={this.onKeyDown}
//           value={timerSecond}
//           onChange={this.onSecondChange}
//           onBlur={() => this.handleBlur('timerSecond')}
//           onFocus={() => this.setState({ timerSecond: '' })}
//         />
//       </form>
//     );
//   }
// }

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
