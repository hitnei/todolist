import React, { Component } from 'react'
import { connect } from "react-redux";
import * as Actions from './../../actions/index';
import './MemoDetailHeader.css'

class MemoDetailHeader extends Component {

    onchangeMemoIsClip = (event, id) => {
        this.props.changeMemoIsClip(id)
    }

    render() {
        var { memoSelected } = this.props
        var {
            _id,
            // IDCategory,
            // IDUser,
            // title,
            // content,
            // createDate,
            // dateDelete,
            isClip,
            // idDelete,
        } = memoSelected
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
                    <div className={isClip? "actionButton isClip" : "actionButton"} onClick={(event, id) => this.onchangeMemoIsClip(event, _id)}>
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

const mapStateToProps = (state) => {
    return {
      
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
      changeMemoIsClip: (id) => {
        dispatch(Actions.changeMemoIsClip(id))
      },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MemoDetailHeader)