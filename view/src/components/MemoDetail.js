import React, { Component } from 'react'
import { CALLAPI } from './../Config'
import { connect } from "react-redux";
import * as Actions from './../actions/index';
import MemoDetailHeader from './memoDetail/MemoDetailHeader'
import MemoDetailContent from './memoDetail/MemoDetailContent'
import './MemoDetail.css'

class MemoDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memo: {},
            cateName: "",
        }
    }

    onSaveMemo = () => {
        var { memo, cateName } = this.state
        if (memo.title && cateName !== '') {
            CALLAPI('post', 'category/createCategory', { categoryName: cateName }, true)
                .then(data => {
                    if (data.status === 200 || data.status === 201) {
                        // 200 -> created, 201 -> had category
                        memo.IDCategory = data.data.category._id
                        this.props.changeOrAddCategory(data.data.category)
                    }
                    CALLAPI('post', 'memo/editMemo', { memo: memo }, true)
                        .then(data => {
                            if (data.status === 200) {
                                var newMemo = data.data.memo
                                this.props.disableEditContent()
                                this.props.changeListMemoById(newMemo)
                                this.props.changeMemoSelected(newMemo)
                                this.setState({ memo: {} })
                            } else {
                                // failure
                            }
                        })
                })

        }
    }

    onChangeMemo = (memo, cateName) => {
        this.setState({ memo, cateName })
    }

    render() {
        var { memoSelected } = this.props
        return (
            <div className="memoDetail">
                <MemoDetailHeader memoSelected={memoSelected} onSaveMemo={this.onSaveMemo} />
                <MemoDetailContent onChangeMemo={(memo, cateName) => this.onChangeMemo(memo, cateName)} onSaveMemo={this.onSaveMemo} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        memoSelected: state.memoSelected,
        allCategory: state.allCategory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        disableEditContent: () => {
            dispatch(Actions.disableEditContent())
        },
        changeListMemoById: (memo) => {
            dispatch(Actions.changeListMemoById(memo))
        },
        changeMemoSelected: (memo) => {
            dispatch(Actions.changeMemoSelected(memo))
        },
        changeOrAddCategory: (category) => {
            dispatch(Actions.changeOrAddCategory(category))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail)
