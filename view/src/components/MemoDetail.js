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
            oldIdCategory: ""
        }
    }

    onSaveMemo = () => {
        var { memo, oldIdCategory } = this.state
        CALLAPI('post', 'memo/editMemo', { memo: memo, oldIdCategory: oldIdCategory }, true)
            .then(data => {
                this.props.disableEditContent()
                if (data.status === 200) {
                    this.props.changeListMemoById(data.data.memo)
                    this.props.changeMemoSelected(data.data.memo)
                    var { oldIdCategory, newIdCategory } = data.data
                    this.props.decreaseCategoryAmountById(oldIdCategory)
                    this.props.increaseCategoryAmountById(newIdCategory)
                } else {
                    // failure
                }
            })
    }

    onChangeMemo = (memo, oldIdCategory) => {
        this.setState({ memo: memo, oldIdCategory: oldIdCategory })
    }

    render() {
        var { memoSelected } = this.props
        return (
            <div className="memoDetail">
                <MemoDetailHeader memoSelected={memoSelected} onSaveMemo={this.onSaveMemo} />
                <MemoDetailContent onChangeMemo={(memo, oldIdCategory) => this.onChangeMemo(memo, oldIdCategory)} />
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
        decreaseCategoryAmountById: (id) => {
            dispatch(Actions.decreaseCategoryAmountById(id))
        },
        increaseCategoryAmountById: (id) => {
            dispatch(Actions.increaseCategoryAmountById(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail)
