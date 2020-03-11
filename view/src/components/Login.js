import React, { Component } from 'react'
import { CALLAPI } from './../Config';
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

    callAPIBegin = () => {
        CALLAPI('post', 'checkToken')
            .then((res) => {
                if (res.status === 200) {
                    CALLAPI('post', 'category/getAllCategory')
                        .then(dataCategory => {
                            this.props.changeAllCategory(dataCategory.data)
                        })
                    CALLAPI('post', 'memo/getAllMemo')
                        .then(dataMemo => {
                            this.props.changeListMemo(dataMemo.data.memos)
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
        this.props.changeLoading()
        setTimeout(() => {
            CALLAPI('post', 'login', { username, password }, false)
                .then(res => {
                    if (res.status === 200) {
                        document.cookie = `authorization=${res.data.token}; path=/`;
                        this.setState({
                            isOnSubmit: false
                        })
                        this.callAPIBegin()
                        this.props.changeIslogin(true)
                    }
                    this.props.changeLoading()
                })
                .catch(error => {
                    this.setState({
                        message: 'error',
                        isOnSubmit: false
                    })
                    this.props.changeLoading()
                })
        }, 100)
    }

    render() {
        var { isOnSubmit } = this.state
        return (
            <div className="loginArea">
                <form onSubmit={this.submitLogin}>
                    <input id="signin" type="radio" name="action" value="signin"
                    // checked={true}
                    />
                    <label htmlFor="signin">Sign in</label>

                    {/* <input id="signup" type="radio" name="action" value="signup" checked/>
                    <label htmlFor="signup">Sign up</label>

                    <input id="reset" type="radio" name="action" value="reset" checked/>
                    <label htmlFor="reset">Reset</label> */}

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
        changeLoading: () => {
            dispatch(Actions.changeLoading())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)