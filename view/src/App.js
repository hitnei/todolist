import React, { Component } from 'react'
import { connect } from "react-redux";
import { CALLAPI } from './Config'
import * as Actions from './actions/index';
import Category from './components/Category'
import ListMemo from './components/ListMemo'
import MemoDetail from './components/MemoDetail'
import './App.css'
import Login from './components/Login'
import AwesomeComponent from './components/AwesomeComponent';

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
    this.props.changeLoading()
    CALLAPI('post', 'checkToken', {}, true)
      .then(async(res) => {
        if (res.status === 200) {
          CALLAPI('post', 'category/getAllCategory', {}, true)
            .then(dataCategory => {
              this.props.changeAllCategory(dataCategory.data)
            })

          CALLAPI('post', 'memo/getAllMemo', {}, true)
            .then(dataMemo => {
              this.props.changeListMemo(dataMemo.data.memos)
            })
            this.props.changeIslogin(true)
          } else {
            this.props.changeIslogin(false)
          }
          this.props.changeLoading()
        })
        .catch(err => {
          this.props.changeLoading()
          console.log(err)
        })
  }

  render() {
    var { isLogin, loading } = this.props
    return (
      <div>
        {loading ? <AwesomeComponent /> : ""}
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
        {loading ? <div className="bgLoading"></div> : ""}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    loading: state.loading,
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
    },
    changeLoading: () => {
      dispatch(Actions.changeLoading())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
