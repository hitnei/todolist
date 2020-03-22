import React, { Component } from 'react'
import { connect } from "react-redux";
import * as Actions from './../../actions/index';
import { CALLAPI } from './../../Config'
import './MemoDetailHeader.css'

class MemoDetailHeader extends Component {

    onchangeMemoIsClip = (event, memo) => {
        this.props.changeLoading()
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
                this.props.changeLoading()
            })

    }

    onSaveMemo = () => {
        this.props.onSaveMemo()
    }

    onChangeIsDisableEditContent = () => {
        this.props.changeIsDisableEditContent()
    }

    onDeleteMemo = (event, memo) => {
        memo.isDelete = !memo.isDelete
        this.props.changeLoading()
        CALLAPI('post', 'memo/editMemo', { memo: memo }, true)
            .then(data => {
                this.props.disableEditContent()
                if (data.status === 200) {
                    this.props.changeListMemoById(memo)
                } else {
                    // failure
                }
                this.props.changeLoading()
            })
    }

    render() {
        var { memoSelected, isDisableEditContent, categorySelect } = this.props
        var {
            // _id,
            // IDCategory,
            // IDUser,
            // title,
            // content,
            // createDate,
            // dateDelete,
            isClip,
            isDelete,
        } = memoSelected
        return (
            <div className="memoDetailHeader disableMemoDetailHeader">
                {(categorySelect !== 'delete' && memoSelected._id) ?
                    <div className="actionButtonLeft">
                        <div className={isDisableEditContent ? 'actionButton actionButtonEdit' : 'actionButton actionButtonEdit activeEditDiv'} onClick={this.onChangeIsDisableEditContent}>
                            <img src={isDisableEditContent ? "/images/pen-solid.svg" : "/images/edit-solid.svg"} alt="pen" />
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
                    :
                    <div></div>
                }
                {
                    memoSelected._id ?
                        <div className="actionButton actionButtonRight" onClick={(event, memo) => this.onDeleteMemo(event, memoSelected)}>
                            <img src="/images/trash-solid.svg" alt="trash" />
                            <span>{categorySelect === 'delete' && isDelete ? "Undelete" : "Delete"}</span>
                        </div>
                        :
                        <div></div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDisableEditContent: state.isDisableEditContent,
        categorySelect: state.categorySelect,
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
        disableEditContent: () => {
            dispatch(Actions.disableEditContent())
        },
        changeLoading: () => {
            dispatch(Actions.changeLoading())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetailHeader)