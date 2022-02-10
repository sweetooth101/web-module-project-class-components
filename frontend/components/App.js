import axios from 'axios'
import React from 'react'




const URL = 'http://localhost:9000/api/todos'


export default class App extends React.Component {
  state = {
    todos: [],
    error: 'NO errors',
    taskInput:''

  }

  fetchAllTodos = () =>{
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data
      })
    })
    .catch(error => {
      console.log(error.response.status)
      this.setState({...this.state, error: error.response.status})
    })
  }

  componentDidMount(){
    this.fetchAllTodos()
  }

  onChange = e => {
    const { value, id } = e.target
    this.setState({ ...this.state, [id]: value })
  }
  

  onSubmit = e => {
    e.preventDefault()
    const newTodo = {
      name: this.state.taskInput,
      completed: false

    }
    axios.post(URL, newTodo)
    .then(res =>{
      this.setState({ ...this.state, todos:[...this.state.todos, res.data.data], taskInput:' '})
     
    })
    .catch(err =>{
      console.log(err)
    })
    
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res =>{
      this.fetchAllTodos()
    })
    .catch(err=>{
      console.log(err)
    })
  }
   
  render() {
    return (
      <div>
        <div>
          <div>Error: {this.state.error}</div>
         <ul>
           {
             this.state.todos.map(task => {
              return  <li key={task.id} onClick={this.toggleCompleted(task.id)} > {task.name} {task.completed ? '👍' : ''}</li>
                })
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
