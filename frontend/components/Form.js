import axios from 'axios'
import React from 'react'

const URL='http://localhost:9000/api/todos'

export default class Form extends React.Component {

  onChange = e =>{
    const {value, id} = e.target
    this.setState({...this.setState, [id]:value})
  }

  onSubmit = e =>{
    e.preventDefault()
    const payloadToSend = {name: this.state.textInput}
    axios.post(URL, payloadToSend)
    .then(res =>{
      this.setState({...this.state, name: res.data.todo})
    })
    .catch(err =>{
      const errorFromAPI = err.response.data.message
      this.setState({...this.state, error: errorFromAPI})
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          onChange={this.onChange}
          type="text"
          id="textInput"
          name="text"
         placeholder='type text'
        />
          <input type='submit' />

        </form>
      </div>
    )
  }
}
