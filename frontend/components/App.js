import React from 'react'


const initialState ={
  tasks: [{task: 'Move the car', id:2343 , completed: false}]
}

const URL = 'http://localhost:9000/api/todos'


export default class App extends React.Component {
  state = initialState

  componentDidMount(){
    this.state.tasks
  }

  onChange = e => {
    const { value, id } = e.target
    this.setState({ ...this.state, [id]: value })
  }
  

  onSubmit = event => {
    event.preventDefault()
    const newTodo = {
      id: Date.now(),
      task: this.state.taskInput,
      completed: false

    }
    this.setState({ ...this.state, tasks: [ ...this.state.tasks, newTodo], taskInput: ''})
  }

  onClick = (id) => {
    this.setState({ ...this.state,
      tasks: this.state.tasks.map(task => {
        if (task.id === id) {
          return {...task, completed: !task.completed}
        } else {
          return task
        }
      })
    })
  }

 
  
  render() {
    return (
      <div>
        <div>
         <ul>
           {
             this.state.tasks.map(task => (
              <li key={task.id} onClick={() => this.onClick(task.id)}> {task.task}</li>
              ))
           }
         </ul>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.taskInput} type="text" id="taskInput" placeholder="add Task"/>
          <input type="submit" />
        
        </form>
      </div>
    )
  }
}
