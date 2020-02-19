import React, { Component } from 'react'
import axios from 'axios'
import Category from './components/Category'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      a: ''
    }
  }
  componentDidMount() {
    axios.get('/a')
    .then(result => {
      this.setState({
        a: result.data.sayHi
      })
      console.log(result)
    })
  }
  render() {
    return (
      <div className="wrapper">
        <Category/>
      </div>
    )
  }
}
