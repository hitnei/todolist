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

    submitLogin = (e) => {
        e.preventDefault();
        var { username, password } = this.state;
        this.setState({ isOnSubmit: true });
        setTimeout(() => {
            axios.post(`${API_URL}/login`, { username, password })
                .then(res => {
                    if (res.status === 200) {
                        document.cookie = `authorization=${res.data.token}; path=/`;
                        this.setState({
                            isOnSubmit: false
                        })
                        this.props.changeIslogin(true)
                    }
                })
                .catch(error => {
                    this.setState({
                        message: 'error',
                        isOnSubmit: false
                    })
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)