import React, { Component } from 'react'
import { connect } from "react-redux";
import * as Actions from './../../actions/index';
import { CALLAPI } from './../../Config'
import './MemoDetailHeader.css'

class MemoDetailHeader extends Component {

    onchangeMemoIsClip = (event, memo) => {
        CALLAPI('post', 'memo/changeMemoClip', { id: memo._id }, true)
            .then(data => {
                if (data.status === 200) {
                    var cloneMemo = { ...memo }
                    cloneMemo.isClip = !cloneMemo.isClip

                    this.props.changeMemoIsClip(memo._id)
                    this.props.changeMemoSelected(cloneMemo)
                } else {
                    console.log('err')
                }
            })

    }

    onSaveMemo = () => {
        this.props.onSaveMemo()
    }

    onChangeIsDisableEditContent = () => {
        this.props.changeIsDisableEditContent()
    }

    onDeleteMemo = (event, memo) => {
        memo.isDelete = true
        this.props.changeListMemoById(memo)
        this.props.decreaseCategoryAmountById(memo.IDCategory)
    }

    render() {
        var { memoSelected, isDisableEditContent } = this.props
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
                    <div className={isDisableEditContent ? 'actionButton actionButtonEdit' : 'actionButton actionButtonEdit activeEditDiv'} onClick={this.onChangeIsDisableEditContent}>
                        <img src="/images/pen-solid.svg" alt="pen" />
                        <span className={isDisableEditContent ? '' : 'activeEditSpan'}>Edit</span>
                    </div>
                    <div className="actionButton actionButtonSave" onClick={this.onSaveMemo}>
                        <img src="/images/save-solid.svg" alt="save" />
                        <span>Save</span>
                    </div>
                    <div className={isClip ? "actionButton isClip" : "actionButton"} onClick={(event, memo) => this.onchangeMemoIsClip(event, memoSelected)}>
                        <img src="/images/paperclip-solid-vertical.svg" alt="paperclip orange" />
                        <span>Clip</span>
                    </div>
                </div>
                <div className="actionButton actionButtonRight" onClick={(event, memo) => this.onDeleteMemo(event, memoSelected)}>
                    <img src="/images/trash-solid.svg" alt="trash" />
                    <span>Delete</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDisableEditContent: state.isDisableEditContent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMemoIsClip: (id) => {
            dispatch(Actions.changeMemoIsClip(id))
        },
        changeMemoSelected: (memo) => {
            dispatch(Actions.changeMemoSelected(memo))
        },
        changeIsDisableEditContent: () => {
            dispatch(Actions.changeIsDisableEditContent())
        },
        changeListMemoById: (memo) => {
            dispatch(Actions.changeListMemoById(memo))
        },
        decreaseCategoryAmountById: (id) => {
            dispatch(Actions.decreaseCategoryAmountById(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetailHeader)