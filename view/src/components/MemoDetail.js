import React, { Component } from 'react'
import { connect } from "react-redux";
import MemoDetailHeader from './memoDetail/MemoDetailHeader'
import MemoDetailContent from './memoDetail/MemoDetailContent'
import './memoDetail.css'

class MemoDetail extends Component {
    render() {
        var {memoSelected} = this.props
        var categoryName = ""
        var {allCategory} = this.props
        allCategory.map((category, index) => {
            if (category.categoryID === memoSelected.categoryID) {
                return categoryName = category.categoryName
            }
            return ""
        })
        return (
            <div className="memoDetail">
                <MemoDetailHeader/>
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

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail)
