import React, { Component } from "react";

import Header from "./header";
import TaskList from "./task-list";
import Footer from "./footer";

import "../index.css";

export default class App extends Component {
  countId = 1;
  state = {
    todoData: [
      this.createItem("Completed task"),
      this.createItem("Active task"),
    ],
    selectedFilter: 'all',
  };

  // СОЗДАНИЕ ЭЛЕМЕНТА
  createItem(description) {
    return {
      id: this.countId++,
      status: "active",
      description,
      done: false,
      createdAt: new Date(), 
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
    this.setState(({ todoData}) => {
        const indx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[indx]
        const newItem = {...oldItem, done: !oldItem.done}
        const newArr = [
            ...todoData.slice(0, indx),
            newItem,
            ...todoData.slice(indx + 1),
          ];
        return {
            todoData: newArr
        }
    })
  }
  // ФИЛЬТР ЗАДАЧ
  handleFilter = (filter) => {
    this.setState({
      selectedFilter: filter
    })
  }
  // УДАЛЕНИЕ COMPLETE ЗАДАЧ
  clearComplete = () => {
    const choseActive = this.state.todoData.filter((el) => !el.done)
    this.setState({
      todoData: choseActive
    })
  }
  render() {
    let filtredTodos;
    if (this.state.selectedFilter === 'all'){
        filtredTodos = this.state.todoData
    } else if (this.state.selectedFilter === 'active'){
        filtredTodos = this.state.todoData.filter(el => !el.done)
    } else if (this.state.selectedFilter === 'completed') {
        filtredTodos = this.state.todoData.filter(el => el.done)
    }
    const activeLeft = this.state.todoData.filter((el) => !el.done).length
    return (
      <section className="todoapp">
        <Header onAdd={this.addItem}/>
        <section className="main">
          <TaskList todos={filtredTodos} onDeleted={this.deletedItem} onToggleActiveCount={this.onToggleActive}/>
          <Footer activeLeftCount={activeLeft} selectedFilter={this.state.selectedFilter} handleFilter={this.handleFilter} clearComplete={this.clearComplete}/>
        </section>
      </section>
    );
  }
}
