import React, { Component } from 'react'
import { connect } from "react-redux";
import ListMemoItem from './listMemo/ListMemoItem'
import './ListMemo.css'

class ListMemo extends Component {
    
    showListMemo = (listMemo) => {
        var {idMemoSelected} = this.props
        return listMemo.map((memo, index) => {
            var {allCategory} = this.props
            var categoryName = ""
            allCategory.filter((category, index) => {
                if (memo.categoryID === category.categoryID) {
                    return categoryName = category.categoryName
                }
                return ""
            })
            return (
                <ListMemoItem key={memo.memoID} memoItem={memo} categoryName={categoryName} isSelected={idMemoSelected === memo.memoID? true : false}/>
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
        idMemoSelected: state.idMemoSelected,
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListMemo)