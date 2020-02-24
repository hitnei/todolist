import React, { Component } from 'react'
import { connect } from "react-redux";
// import axios from 'axios'
import Category from './components/Category'
import ListMemo from './components/ListMemo'
import MemoDetail from './components/MemoDetail'
import './App.css'
import Login from './components/Login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    var {isLogin} = this.props
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

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
