import React, { Component } from 'react'
import './Login.css'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div className="loginArea">
                {/* <form>
                    <div>
                        <img width="25px" src="/images/mail-regular.svg" alt="mail"/>
                        <input />
                    </div>
                    <div>
                        <img width="25px" src="/images/unlock-solid.svg" alt="password"/>
                        <input />
                    </div>
                </form> */}
                
                <form>
                    <input id="signin" type="radio" name="action" value="signin" checked={true}/>
                    <label for="signin">Sign in</label>

                    <input id="signup" type="radio" name="action" value="signup"/>
                    <label for="signup">Sign up</label>

                    <input id="reset" type="radio" name="action" value="reset"/>
                    <label for="reset">Reset</label>

                    <div id="wrapper">
                        <div id="arrow"></div>
                        <input id="email" placeholder="Email" type="text"/>
                        <input id="pass" placeholder="Password" type="password"/>
                        <input id="repass" placeholder="Repeat password" type="password"/>
                    </div>
                    <button type="submit">
                        <span>
                            Reset password
                            <br />
                            Sign in
                            <br />
                            Sign up
                        </span>
                    </button>
                </form>
                <div id="hint">Click on the tabs</div>

            </div>
        )
    }
}
