import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import { API_URL } from './Config'
import * as Actions from './actions/index';
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

  componentDidMount() {
    this.checkToken()
  }

  checkToken = () => {
    this.callAPIBegin(this.getToken())
  }

  getToken = () => {
    let token = document.cookie.split(";").find(x => x.includes("authorization"));
    if (token && token.split("=")[1]) {
      token = token.split("=")[1]
      return token
    }
    return ""
  }

  callAPIBegin = (token) => {
    axios.post(
      `${API_URL}/checkToken`,
      {},
      { headers: { Authorization: `bearer ${token}` } }
    ).then((res) => {
      if (res.status === 200) {
        axios.post(
          `${API_URL}/category/getAllCategory`,
          {},
          { headers: { Authorization: `bearer ${token}` } }
        ).then(dataCategory => {
          this.props.changeAllCategory(dataCategory.data)
        })
        axios.post(
          `${API_URL}/memo/getAllMemo`,
          {},
          { headers: { Authorization: `bearer ${token}` } }
        ).then(dataMemo => {
          this.props.changeListMemo(dataMemo.data.memos)
        })
        this.props.changeIslogin(true)
      } else {
        this.props.changeIslogin(false)
      }
    })
  }

  render() {
    var { isLogin } = this.props
    return (
      <div>
        {
          isLogin ?
            (
              <div className="wrapper">
                <Category />
                <ListMemo />
                <MemoDetail />
              </div>
            )
            :
            (
              <Login />
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
    changeIslogin: (isLogin) => {
      dispatch(Actions.changeIslogin(isLogin))
    },
    changeAllCategory: (data) => {
      dispatch(Actions.changeAllCategory(data))
    },
    changeListMemo: (data) => {
      dispatch(Actions.changeListMemo(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
