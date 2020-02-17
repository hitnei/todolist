import React, { Component } from 'react'
import axios from 'axios'

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
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.a}
            as
          </a>
        </header>
      </div>
    )
  }
}
