import React, { Component } from 'react';

import Header from './header';
import TaskList from './task-list';
import Footer from './footer';

import '../index.css';

export default class App extends Component {
  countId = 1;

  constructor(props) {
    super(props);
    this.state = {
      todoData: [
        this.createItem('Completed task'),
        this.createItem('Active task'),
      ],
      selectedFilter: 'all',
    };
  }

  // ДОБАВЛЕНИЕ ЭЛЕМЕНТА
  addItem = (text) => {
    const newItem = this.createItem(text);
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

  // СОЗДАНИЕ ЭЛЕМЕНТА
  createItem(description) {
    this.countId += 1;
    return {
      id: this.countId,
      status: 'active',
      description,
      done: false,
      createdAt: new Date(),
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
