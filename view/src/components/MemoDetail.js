import React, { Component } from 'react'
import { connect } from "react-redux";
import MemoDetailHeader from './memoDetail/MemoDetailHeader'
import MemoDetailContent from './memoDetail/MemoDetailContent'
import './MemoDetail.css'

class MemoDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memo: {}
        }
    }

    onSaveMemo = (data) => {
        
    }

    onChangeMemo = (memo) => {
        this.setState({memo: memo})
    }

    render() {
        var { memoSelected } = this.props
        var categoryName = ""
        var { allCategory } = this.props
        allCategory.map((category, index) => {
            if (category._id === memoSelected.IDCategory) {
                return categoryName = category.categoryName
            }
            return ""
        })
        return (
            <div className="memoDetail">
                <MemoDetailHeader memoSelected={memoSelected} onSaveMemo={(data) => this.onSaveMemo(data)}/>
                <MemoDetailContent categoryName={categoryName} onChangeMemo={(memo) => this.onChangeMemo(memo)}/>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail)
