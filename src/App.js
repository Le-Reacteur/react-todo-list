import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    tasks: [],
    taskName: ""
  };
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    this.setState({
      taskName: value
    });
  };
  copyTab = tab => {
    const newTab = [];
    for (let i = 0; i < tab.length; i++) {
      newTab.push(tab[i]);
    }
    return newTab;
  };
  handleSubmit = event => {
    event.preventDefault();
    const newTasks = this.copyTab(this.state.tasks);
    newTasks.push({
      name: this.state.taskName,
      isDone: false
    });

    this.setState({
      taskName: "",
      tasks: newTasks
    });
  };
  handleClick = name => {
    const newTasks = this.copyTab(this.state.tasks);
    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].name === name) {
        if (newTasks[i].isDone === true) {
          newTasks[i].isDone = false;
        } else {
          newTasks[i].isDone = true;
        }
        break;
      }
    }

    this.setState({
      tasks: newTasks
    });
  };
  handleDelete = name => {
    const newTasks = [];
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i].name !== name) {
        newTasks.push(this.state.tasks[i]);
      }
    }

    this.setState({
      tasks: newTasks
    });
  };
  render() {
    return (
      <div>
        <h1>To-Do list</h1>
        <ul className="tasks-list">
          {this.state.tasks.map((task, index) => {
            let className = "";
            if (task.isDone === true) {
              className = "done";
            }
            return (
              <li key={index}>
                <span onClick={() => this.handleDelete(task.name)}>X </span>
                <span
                  className={className}
                  onClick={() => this.handleClick(task.name)}
                >
                  {task.name}
                </span>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="taskName"
            value={this.state.taskName}
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="Ajouter une tâche" />
        </form>
      </div>
    );
  }
}

export default App;
