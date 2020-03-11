import React from "react";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import './AwesomeComponent.css'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 100;
`;
export default class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <div className="sweet-loading">
                <SyncLoader
                    css={override}
                    size={20}
                    color={"#313F46"}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}
