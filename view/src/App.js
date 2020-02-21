import React, { Component } from 'react'
// import axios from 'axios'
import Category from './components/Category'
import ListMemo from './components/ListMemo'
import MemoDetail from './components/MemoDetail'
import './App.css'
import Login from './components/Login'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }
  render() {
    var {isLogin} = this.state
    return (
      <div>
      {
        isLogin? 
        (
          <div className="wrapper">
            <Category/>
            <ListMemo/>
            <MemoDetail/>
          </div>
        ) 
        : 
        (
          <Login/>
        )
      }
        
      </div>
    )
  }
}
