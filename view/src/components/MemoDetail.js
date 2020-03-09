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
        }
    }

    onSaveMemo = () => {
        var { memo } = this.state
        CALLAPI('post', 'memo/editMemo', { memo: memo }, true)
            .then(data => {
                if (data.status === 200) {
                    var newMemo = data.data.memo
                    this.props.disableEditContent()
                    this.props.changeListMemoById(newMemo)
                } else {
                    // failure
                }
            })
    }

    onChangeMemo = (memo) => {
        this.setState({ memo: memo })
    }

    render() {
        var { memoSelected } = this.props
        return (
            <div className="memoDetail">
                <MemoDetailHeader memoSelected={memoSelected} onSaveMemo={this.onSaveMemo} />
                <MemoDetailContent onChangeMemo={(memo) => this.onChangeMemo(memo)} onSaveMemo={this.onSaveMemo} />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail)
