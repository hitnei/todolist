import React, { Component } from 'react'
// import axios from 'axios'
import Category from './components/Category'
import ListMemo from './components/ListMemo'
import MemoDetail from './components/MemoDetail'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className="wrapper">
        <Category/>
        <ListMemo/>
        <MemoDetail/>
      </div>
    )
  }
}
