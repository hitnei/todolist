import React, { Component } from 'react'
import { connect } from "react-redux";
import ListMemoItem from './listMemo/ListMemoItem'
import * as Actions from './../actions/index';
import './ListMemo.css'

class ListMemo extends Component {
    
    showListMemo = (listMemo) => {
        return listMemo.map((memo, index) => {
            if (index === 0) this.props.changeMemoSelected(memo)
            var {memoSelected, allCategory} = this.props
            console.log(memoSelected)
            var categoryName = ""
            allCategory.filter((category, index) => {
                if (memo.IDCategory === category._id) {
                    return categoryName = category.categoryName
                }
                return ""
            })
            return (
                <ListMemoItem key={memo._id} memoItem={memo} categoryName={categoryName} isSelected={memoSelected._id === memo._id? true : false}/>
            )
        })
    }

    render() {
        var {listMemo} = this.props
        return (
            <div className="listMemo">
                <div className="listMemoSearch">
                    <input type="text" placeholder="キーワードを入力"/>
                    <img src="/images/search-solid.svg" alt="search"/>
                </div>
                <div className="listMemoTitle">
                    <span>Title</span>
                    <img src="/images/sort-amount-up-alt-solid.svg" alt="sort"/>
                </div>
                <div className="listMemoShortcut">
                    {this.showListMemo(listMemo)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listMemo: state.listMemo,
        allCategory: state.allCategory,
        memoSelected: state.memoSelected,
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
        changeMemoSelected: (id) => {
            dispatch(Actions.changeMemoSelected(id))
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListMemo)