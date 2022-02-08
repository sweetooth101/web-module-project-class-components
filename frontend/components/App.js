import React from 'react'
import Form from './Form'
import Todo from './Todo'
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Form />
        <Todo />
      </div>
    )
  }
}
