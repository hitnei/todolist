import React, { Component } from 'react'
import Draggable from 'react-draggable';
import { CALLAPI } from './../Config'
import { connect } from "react-redux";
import * as Actions from './../actions/index';
import './MenuCircle.css'

class AniCircle extends Component {

    onClickMenu = (e) => {
        e.preventDefault()
        var { isShowCategory } = this.props
        if (isShowCategory) {
            // was showing category
            this.props.changeIsShowCategory(false)
        } else {
            this.props.changeIsShowCategory(true)
        }
        this.props.changeIsShowListMemo(false)
    }

    onClickList = (e) => {
        e.preventDefault()
        var { isShowListMemo } = this.props
        if (isShowListMemo) {
            // was showing listmemo
            this.props.changeIsShowListMemo(false)
        } else {
            this.props.changeIsShowListMemo(true)
        }
        this.props.changeIsShowCategory(false)
    }

    onCreate = (e) => {
        e.preventDefault()
        var { onCreate } = this.props
        this.props.changeIsShowCategory(true)
        this.props.changeIsShowListMemo(false)
        if (onCreate) {
            // was showing create and category
            this.props.changeOnCreate(false)
        } else {
            this.props.changeOnCreate(true)
        }
    }

    onEdit = (e) => {
        e.preventDefault()
        this.props.changeIsDisableEditContent()
    }

    onClip = (e) => {
        e.preventDefault()
        var { memoSelected } = this.props
        this.onchangeMemoIsClip(e, memoSelected)
    }

    onDelete = (e) => {
        e.preventDefault()
        var { memoSelected } = this.props
        this.onDeleteMemo(e, memoSelected)
    }

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
        var { isDisableEditContent } = this.props
        return (
            <div className="MenuCircle disableMenuCircle">
                <Draggable
                    // axis="x"
                    defaultClassName="draggable"
                    handle=".handle"
                    bounds="body"
                    // defaultPosition={{ x: 50, y: 50}}
                    // position={{ x: '50%', y: '50%' }}
                    // positionOffset= {{x: '50%', y: '50%'}}
                    grid={[25, 25]}
                    scale={1}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}
                >
                    <nav className="menu handle">
                        <input type="checkbox" href="/" className="menu-open" name="menu-open" id="menu-open" />
                        <label className="menu-open-button" htmlFor="menu-open">
                            <span className="lines line-1"></span>
                            <span className="lines line-2"></span>
                            <span className="lines line-3"></span>
                        </label>

                        <a href="/" className="menu-item blue" onClick={this.onClickMenu}>
                            <span>Menu</span>
                            <img src="/images/menu.svg" alt="menu" width="20px" height="20px" />
                        </a>
                        <a href="/" className="menu-item green" onClick={this.onClickList}>
                            <span>List</span>
                            <img src="/images/list.svg" alt="list" width="20px" height="20px" />
                        </a>
                        {
                            isDisableEditContent ?
                                <a href="/" className="menu-item red" onClick={this.onEdit}>
                                    <span>Edit</span>
                                    <img src="/images/edit.svg" alt="edit" width="15px" height="15px" />
                                </a>
                                :
                                <a href="/" className="menu-item red" onClick={this.onEdit}>
                                    <span>Save</span>
                                    <img src="/images/save.svg" alt="save" width="20px" height="20px" />
                                </a>
                        }
                        <a href="/" className="menu-item purple" onClick={this.onClip}>
                            <span>Clip</span>
                            <img src="/images/clip.svg" alt="clip" width="22px" height="22px" />
                        </a>
                        <a href="/" className="menu-item orange" onClick={this.onDelete}>
                            <span>Delete</span>
                            <img src="/images/trash.svg" alt="trash" width="18px" height="18px" />
                        </a>
                        <a href="/" className="menu-item lightblue" onClick={this.onCreate}>
                            <span>Create</span>
                            <img src="/images/create.svg" alt="create" width="20px" height="20px" />
                        </a>
                    </nav>
                </Draggable>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        memoSelected: state.memoSelected,
        isShowCategory: state.isShowCategory,
        isShowListMemo: state.isShowListMemo,
        onCreate: state.onCreate,
        isDisableEditContent: state.isDisableEditContent,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeIsShowCategory: (value) => {
            dispatch(Actions.changeIsShowCategory(value))
        },
        changeIsShowListMemo: (value) => {
            dispatch(Actions.changeIsShowListMemo(value))
        },
        changeOnCreate: (value) => {
            dispatch(Actions.changeOnCreate(value))
        },
        changeIsDisableEditContent: () => {
            dispatch(Actions.changeIsDisableEditContent())
        },
        changeLoading: () => {
            dispatch(Actions.changeLoading())
        },
        changeMemoIsClip: (id) => {
            dispatch(Actions.changeMemoIsClip(id))
        },
        changeMemoSelected: (memo) => {
            dispatch(Actions.changeMemoSelected(memo))
        },
        disableEditContent: () => {
            dispatch(Actions.disableEditContent())
        },
        changeListMemoById: (memo) => {
            dispatch(Actions.changeListMemoById(memo))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AniCircle)