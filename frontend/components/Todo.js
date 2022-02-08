import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class Todo extends React.Component {
  componentDidMount(){
    axios.get(URL)
    .then(res =>{
      console.log(res)
      this.setState({...this.state, todo: res.data.data})
    })
    .catch(err=>{
      console.log(err)
    })
  }
  render() {
    return (
      <div>
        hi
      </div>
    )
  }
}
