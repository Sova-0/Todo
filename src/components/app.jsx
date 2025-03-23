import React, { useRef, useState } from 'react';

import Header from './header';
import TaskList from './task-list';
import Footer from './footer';

import '../index2.css';
// import '../index.css';


function App() {
  const [todoData, setTodoData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const countId = useRef(1);

  // СОЗДАНИЕ ЭЛЕМЕНТА
  const createItem = (description, timerMinut, timerSecond) => {
    countId.current += 1;
    return {
      id: countId.current,
      status: 'active',
      description,
      done: false,
      createdAt: new Date(),
      timerMinut,
      timerSecond,
      taimerIsRunning: false,
      intervalId: null,
    };
  }

  // ДОБАВЛЕНИЕ ЭЛЕМЕНТА
  const addItem = (text, timerMinut, timerSecond) => {
    const newItem = createItem(text, timerMinut, timerSecond);
    setTodoData((prevState) => ([...prevState, newItem]));
  };

  // УДАЛЕНИЕ ЭЛЕМЕНТА
  const deletedItem = (id) => {
    setTodoData((prevState) => {
      const indx = prevState.findIndex((el) => el.id === id);
      return [...prevState.slice(0, indx), ...prevState.slice(indx + 1)]
    })
  };

  // СЧЕТЧИК ЗАДАЧ
  const onToggleActive = (id) => {
    setTodoData((prevState) => {
      const indx = prevState.findIndex((el) => el.id === id);
      const oldItem = prevState[indx];
      const newItem = { ...oldItem, done: !oldItem.done };

      return [
        ...prevState.slice(0, indx),
        newItem,
        ...prevState.slice(indx + 1)];
    })
  };

  // ФИЛЬТР ЗАДАЧ
  const handleFilter = (filter) => {
    setSelectedFilter(filter);
  };

  // УДАЛЕНИЕ COMPLETE ЗАДАЧ
  const clearComplete = () => {
    setTodoData((prevState) => prevState.filter((el) => !el.done))
  }

  const onEditTask = (id, newDescription) => {
    setTodoData((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task));
  }

  // ОБНОВЛЯЕТ СЕКУНДЫ И МИНУТЫ
  const updateTimer = (id) => {
    setTodoData((prevState) => prevState.map((task) => {
      if (task.id === id) {
        if (task.timerMinut === 0 && task.timerSecond === 0) {
          clearInterval(task.intervalId);
          return { ...task, taimerIsRunning: false, intervalId: null };
        }
        if (task.timerSecond === 0) {
          return {
            ...task,
            timerMinut: task.timerMinut - 1,
            timerSecond: 59,
          };
        }
        if (task.timerSecond > 0) {
          return {
            ...task,
            timerSecond: task.timerSecond - 1,
          };
        }
      }
      return task;
    })
    )
  };

  // ЗАПУСК ТАЙМЕРА
  const startTimer = (id) => {
    setTodoData((prevState) => prevState.map((task) => {
      if (task.id === id) {
        if (task.taimerIsRunning) return task;
        const intervalId = setInterval(() => {
          updateTimer(id);
        }, 1000);
        return { ...task, taimerIsRunning: true, intervalId }
      }
      return task;
    })
    );
  };

  // ОСТАНОВКА ТАЙМЕРА
  const stopTimer = (id) => {
    setTodoData((prevState) => prevState.map((task) => {
      if (task.id === id) {
        clearInterval(task.intervalId);
        return {
          ...task,
          taimerIsRunning: false,
          intervalId: null,
        };
      }
      return task;
    })
    )
  };

  const filtredTodos = todoData.filter((el) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return !el.done;
    if (selectedFilter === 'completed') return el.done;
    return true;
  });

  const activeLeft = todoData.filter((el) => !el.done).length;

  return (
    <section className="todoapp">
      <Header onAdd={addItem} />
      <section className="main">
        <TaskList
          todos={filtredTodos}
          onDeleted={deletedItem}
          onToggleActiveCount={onToggleActive}
          onEditTask={onEditTask}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Footer
          activeLeftCount={activeLeft}
          selectedFilter={selectedFilter}
          handleFilter={handleFilter}
          clearComplete={clearComplete}
        />
      </section>
    </section>
  );
}

export default App;

// export default class App extends Component {
// countId = 1;

// constructor(props) {
//   super(props);
//   this.state = {
//     todoData: [],
//     selectedFilter: 'all',
//   };
// }

// ДОБАВЛЕНИЕ ЭЛЕМЕНТА
// addItem = (text, timerMinut, timerSecond) => {
//   const newItem = this.createItem(text, timerMinut, timerSecond);
//   this.setState(({ todoData }) => {
//     const newArr = [...todoData, newItem];
//     return {
//       todoData: newArr,
//     };
//   });
// };

// УДАЛЕНИЕ ЭЛЕМЕНТА
// deletedItem = (id) => {
//   this.setState(({ todoData }) => {
//     const indx = todoData.findIndex((el) => el.id === id);
//     const newArr = [...todoData.slice(0, indx), ...todoData.slice(indx + 1)];
//     return {
//       todoData: newArr,
//     };
//   });
// };

// СЧЕТЧИК ЗАДАЧ
// onToggleActive = (id) => {
//   this.setState(({ todoData }) => {
//     const indx = todoData.findIndex((el) => el.id === id);
//     const oldItem = todoData[indx];
//     const newItem = { ...oldItem, done: !oldItem.done };
//     const newArr = [
//       ...todoData.slice(0, indx),
//       newItem,
//       ...todoData.slice(indx + 1),
//     ];
//     return {
//       todoData: newArr,
//     };
//   });
// };

// ФИЛЬТР ЗАДАЧ
// handleFilter = (filter) => {
//   this.setState({
//     selectedFilter: filter,
//   });
// };

// УДАЛЕНИЕ COMPLETE ЗАДАЧ
// clearComplete = () => {
//   const { todoData } = this.state;
//   const choseActive = todoData.filter((el) => !el.done);
//   this.setState({
//     todoData: choseActive,
//   });
// };

// onEditTask = (id, newDescription) => {
//   this.setState(({ todoData }) => {
//     const updatedTasks = todoData.map((task) =>
//       task.id === id ? { ...task, description: newDescription } : task
//     );
//     return { todoData: updatedTasks };
//   });
// };

// ЗАПУСК ТАЙМЕРА
// startTimer = (id) => {
//   this.setState(({ todoData }) => {
//     const updateData = todoData.map((task) => {
//       if (task.id === id) {
//         if (task.taimerIsRunning) {
//           return task;
//         }
//         const intervalId = setInterval(() => {
//           this.updateTimer(id);
//         }, 1000);
//         return { ...task, taimerIsRunning: true, intervalId };
//       }
//       return task;
//     });
//     return { todoData: updateData };
//   });
// };

// ОБНОВЛЯЕТ СЕКУНДЫ И МИНУТЫ
// updateTimer = (id) => {
//   this.setState(({ todoData }) => {
//     const updateData = todoData.map((task) => {
//       if (task.id === id) {
//         if (task.timerMinut === 0 && task.timerSecond === 0) {
//           clearInterval(task.intervalId);
//           return { ...task, taimerIsRunning: false, intervalId: null };
//         }
//         if (task.timerSecond === 0) {
//           return {
//             ...task,
//             timerMinut: task.timerMinut - 1,
//             timerSecond: 59,
//           };
//         }
//         if (task.timerSecond > 0) {
//           return {
//             ...task,
//             timerSecond: task.timerSecond - 1,
//           };
//         }
//       }
//       return task;
//     });
//     return {
//       todoData: updateData,
//     };
//   });
// };

// ОСТАНОВКА ТАЙМЕРА
// stopTimer = (id) => {
//   this.setState(({ todoData }) => {
//     const updateDate = todoData.map((task) => {
//       if (task.id === id) {
//         clearInterval(task.intervalId);
//         return {
//           ...task,
//           taimerIsRunning: false,
//           intervalId: null,
//         };
//       }
//       return task;
//     });
//     return {
//       todoData: updateDate,
//     };
//   });
// };

// СОЗДАНИЕ ЭЛЕМЕНТА
// createItem(description, timerMinut, timerSecond) {
//   this.countId += 1;
//   return {
//     id: this.countId,
//     status: 'active',
//     description,
//     done: false,
//     createdAt: new Date(),
//     timerMinut,
//     timerSecond,
//     taimerIsRunning: false,
//     intervalId: null,
//   };
// }

// render() {
// let filtredTodos;
// const { selectedFilter, todoData } = this.state;
// if (selectedFilter === 'all') {
//   filtredTodos = todoData;
// } else if (selectedFilter === 'active') {
//   filtredTodos = todoData.filter((el) => !el.done);
// } else if (selectedFilter === 'completed') {
//   filtredTodos = todoData.filter((el) => el.done);
// }
// const activeLeft = todoData.filter((el) => !el.done).length;
//   return (
//     <section className="todoapp">
//       <Header onAdd={this.addItem} />
//       <section className="main">
//         <TaskList
//           todos={filtredTodos}
//           onDeleted={this.deletedItem}
//           onToggleActiveCount={this.onToggleActive}
//           onEditTask={this.onEditTask}
//           onStartTimer={this.startTimer}
//           onStopTimer={this.stopTimer}
//         />
//         <Footer
//           activeLeftCount={activeLeft}
//           selectedFilter={selectedFilter}
//           handleFilter={this.handleFilter}
//           clearComplete={this.clearComplete}
//         />
//       </section>
//     </section>
//   );
// }
// }
