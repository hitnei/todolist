import React, { Component } from 'react'
import { connect } from "react-redux";
import * as Actions from './../actions/index';
import MemoDetailHeader from './memoDetail/MemoDetailHeader'
import MemoDetailContent from './memoDetail/MemoDetailContent'
import './MemoDetail.css'

class MemoDetail extends Component {
    render() {
        var {memoSelected} = this.props
        var categoryName = ""
        var {allCategory} = this.props
        allCategory.map((category, index) => {
            if (category._id === memoSelected.IDCategory) {
                return categoryName = category.categoryName
            }
            return ""
        })
        return (
            <div className="memoDetail">
                <MemoDetailHeader memoSelected={memoSelected}/>
                <MemoDetailContent memoSelected={memoSelected} categoryName={categoryName}/>
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
        changeMemoSelected: (id) => {
            dispatch(Actions.changeMemoSelected(id))
        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail)
