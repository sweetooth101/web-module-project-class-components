import axios from 'axios'
import React from 'react'


const initialState ={
  tasks: [{task: 'Move the car', id:2343 , completed: false}]
}

const URL = 'http://localhost:9000/api/todos'


export default class App extends React.Component {
  state = initialState

  componentDidMount(){
    axios.get(URL)
    .then(res=>{
      console.log(res)
      this.setState({...this.state, tasks: res.data.data})
    })
    .catch(err=>{
      console.log(err)
    })
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
      console.log(res.data.data)
      this.setState({ ...this.state, tasks: res.data})
    })
    .catch(err =>{
      console.log(err)
    })
    
  }
   
  render() {
    return (
      <div>
        <div>
         <ul>
           {
             this.state.tasks.map(task => 
              <li key={task.id} > {task.name}</li>
             )
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
