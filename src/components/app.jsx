import React, { Component } from 'react';

import Header from './header';
import TaskList from './task-list';
import Footer from './footer';

import '../index2.css';
// import '../index.css';

export default class App extends Component {
  countId = 1;

  constructor(props) {
    super(props);
    this.state = {
      todoData: [],
      selectedFilter: 'all',
    };
  }

  // ДОБАВЛЕНИЕ ЭЛЕМЕНТА
  addItem = (text, taimerMinut, taimerSecond) => {
    const newItem = this.createItem(text, taimerMinut, taimerSecond);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  // УДАЛЕНИЕ ЭЛЕМЕНТА
  deletedItem = (id) => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, indx), ...todoData.slice(indx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  // СЧЕТЧИК ЗАДАЧ
  onToggleActive = (id) => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[indx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArr = [
        ...todoData.slice(0, indx),
        newItem,
        ...todoData.slice(indx + 1),
      ];
      return {
        todoData: newArr,
      };
    });
  };

  // ФИЛЬТР ЗАДАЧ
  handleFilter = (filter) => {
    this.setState({
      selectedFilter: filter,
    });
  };

  // УДАЛЕНИЕ COMPLETE ЗАДАЧ
  clearComplete = () => {
    const { todoData } = this.state;
    const choseActive = todoData.filter((el) => !el.done);
    this.setState({
      todoData: choseActive,
    });
  };

  onEditTask = (id, newDescription) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      );
      return { todoData: updatedTasks };
    });
  };

  // ЗАПУСК ТАЙМЕРА
  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const updateData = todoData.map((task) => {
        if (task.id === id) {
          if (task.taimerIsRunning) {
            return task;
          }
          const intervalId = setInterval(() => {
            this.updateTimer(id);
          }, 1000);
          return { ...task, taimerIsRunning: true, intervalId };
        }
        return task;
      });
      return { todoData: updateData };
    });
  };

  // ОБНОВЛЯЕТ СЕКУНДЫ И МИНУТЫ
  updateTimer = (id) => {
    this.setState(({ todoData }) => {
      const updateData = todoData.map((task) => {
        if (task.id === id) {
          if (task.taimerMinut === 0 && task.taimerSecond === 0) {
            clearInterval(task.intervalId);
            return { ...task, taimerIsRunning: false, intervalId: null };
          }
          if (task.taimerSecond === 0) {
            return {
              ...task,
              taimerMinut: task.taimerMinut - 1,
              taimerSecond: 59,
            };
          }
          if (task.taimerSecond > 0) {
            return {
              ...task,
              taimerSecond: task.taimerSecond - 1,
            };
          }
        }
        return task;
      });
      return {
        todoData: updateData,
      };
    });
  };

  // ОСТАНОВКА ТАЙМЕРА
  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const updateDate = todoData.map((task) => {
        if (task.id === id) {
          clearInterval(task.intervalId);
          return {
            ...task,
            taimerIsRunning: false,
            intervalId: null,
          };
        }
        return task;
      });
      return {
        todoData: updateDate,
      };
    });
  };

  // СОЗДАНИЕ ЭЛЕМЕНТА
  createItem(description, taimerMinut, taimerSecond) {
    this.countId += 1;
    return {
      id: this.countId,
      status: 'active',
      description,
      done: false,
      createdAt: new Date(),
      taimerMinut,
      taimerSecond,
      taimerIsRunning: false,
      intervalId: null,
    };
  }

  render() {
    let filtredTodos;
    const { selectedFilter, todoData } = this.state;
    if (selectedFilter === 'all') {
      filtredTodos = todoData;
    } else if (selectedFilter === 'active') {
      filtredTodos = todoData.filter((el) => !el.done);
    } else if (selectedFilter === 'completed') {
      filtredTodos = todoData.filter((el) => el.done);
    }
    const activeLeft = todoData.filter((el) => !el.done).length;
    return (
      <section className="todoapp">
        <Header onAdd={this.addItem} />
        <section className="main">
          <TaskList
            todos={filtredTodos}
            onDeleted={this.deletedItem}
            onToggleActiveCount={this.onToggleActive}
            onEditTask={this.onEditTask}
            onStartTimer={this.startTimer}
            onStopTimer={this.stopTimer}
          />
          <Footer
            activeLeftCount={activeLeft}
            selectedFilter={selectedFilter}
            handleFilter={this.handleFilter}
            clearComplete={this.clearComplete}
          />
        </section>
      </section>
    );
  }
}
