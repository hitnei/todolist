import React, { Component } from 'react'
import { connect } from "react-redux";
import './MemoDetailHeader.css'

class MemoDetailHeader extends Component {
    render() {
        var {memoSelected} = this.props
        var {
            // _id,
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
                        <img src="/images/pen-solid.svg" alt="pen"/>
                        <span>Edit</span>
                    </div>
                    <div className="actionButton actionButtonSave">
                        <img src="/images/save-solid.svg" alt="save"/>
                        <span>Save</span>
                    </div>
                    <div className={isClip? "actionButton isClip" : "actionButton"} >
                        <img src="/images/paperclip-solid-vertical.svg" alt="paperclip orange"/>
                        <span>Clip</span>
                    </div>
                </div>
                <div className="actionButton actionButtonRight">
                    <img src="/images/trash-solid.svg" alt="trash"/>
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
        
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MemoDetailHeader)