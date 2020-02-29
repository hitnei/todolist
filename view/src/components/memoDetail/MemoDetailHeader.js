import React, { Component } from 'react'
import './MemoDetailHeader.css'

export default class MemoDetailHeader extends Component {
    render() {
        return (
            <div className="memoDetailHeader">
                <div className="actionButtonLeft">
                    <div className="actionButton actionButtonEdit">
                        <img src="/images/pen-solid.svg" alt="pen" />
                        <span>Edit</span>
                    </div>
                    <div className="actionButton actionButtonSave">
                        <img src="/images/save-solid.svg" alt="save" />
                        <span>Save</span>
                    </div>
                    <div className="actionButton">
                        <img src="/images/paperclip-solid-vertical.svg" alt="paperclip orange" />
                        <span>Clip</span>
                    </div>
                </div>
                <div className="actionButton actionButtonRight">
                    <img src="/images/trash-solid.svg" alt="trash" />
                    <span>Delete</span>
                </div>
            </div>
        )
    }
}
