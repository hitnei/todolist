import React, { Component } from 'react'
import axios from 'axios';
import { API_URL } from './../Config';
import * as Actions from '../actions/index';
import { connect } from "react-redux";
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            // repeatPassword: "",
            isOnSubmit: false
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
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
              this.props.changeListMemoSelected(dataMemo.data.memos)
            })
            this.props.changeIslogin(true)
          } else {
            this.props.changeIslogin(false)
          }
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        var { username, password } = this.state;
        this.setState({ isOnSubmit: true });
        // setTimeout(() => {
            axios.post(`${API_URL}/login`, { username, password })
                .then(res => {
                    if (res.status === 200) {
                        document.cookie = `authorization=${res.data.token}; path=/`;
                        this.setState({
                            isOnSubmit: false
                        })
                        this.callAPIBegin(this.getToken())
                        this.props.changeIslogin(true)
                    }
                })
                .catch(error => {
                    this.setState({
                        message: 'error',
                        isOnSubmit: false
                    })
                })
        // }, 100)
    }

    render() {
        var { isOnSubmit } = this.state
        return (
            <div className="loginArea">
                <form onSubmit={this.submitLogin}>
                    <input id="signin" type="radio" name="action" value="signin"
                    // checked={true}
                    />
                    <label for="signin">Sign in</label>

                    {/* <input id="signup" type="radio" name="action" value="signup" checked/>
                    <label for="signup">Sign up</label>

                    <input id="reset" type="radio" name="action" value="reset" checked/>
                    <label for="reset">Reset</label> */}

                    <div id="wrapper">
                        <div id="arrow"></div>
                        <input id="email" placeholder="Username" type="text" name="username" onChange={this.changeHandler} />
                        <input id="pass" placeholder="Password" type="password" name="password" onChange={this.changeHandler} />
                        {/* <input id="repass" placeholder="Repeat password" type="password" name="repeatPassword" onChange={this.changeHandler}/> */}
                    </div>
                    {isOnSubmit ?
                        <button type="submit" disabled>
                            <span>
                                {/* Reset password */}
                                <br />
                                Sign in
                                {/* <br /> */}
                                {/* Sign up */}
                            </span>
                        </button>
                        :
                        <button type="submit">
                            <span>
                                {/* Reset password */}
                                {/* <br /> */}
                                Sign in
                                <br />
                                {/* Sign up */}
                            </span>
                        </button>
                    }
                </form>
                <div id="hint">Click on the tabs</div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

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
        changeListMemoSelected: (data) => {
            dispatch(Actions.changeListMemoSelected(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)