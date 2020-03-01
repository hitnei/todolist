import React, { Component } from 'react'
import { connect } from "react-redux";
import ListMemoItem from './listMemo/ListMemoItem'
import * as Actions from './../actions/index';
import './ListMemo.css'

class ListMemo extends Component {

    showListMemo = (listMemo) => {
        var {categorySelect, memoSelected} = this.props
        var listMemoSelect = categorySelect === 'all'? listMemo 
        : categorySelect === 'clip'? listMemo.filter(memo => memo.isClip)
        : listMemo.filter(memo => memo.IDCategory === categorySelect)
        
        //set memo selected default
        if (!memoSelected._id) this.props.changeMemoSelected(listMemoSelect[0])
        
        return listMemoSelect.map((memo, index) => {
            return <ListMemoItem key={memo._id} memoItem={memo} isSelected={memoSelected._id === memo._id ? true : false} />
        })
    }

    render() {
        var { listMemo } = this.props
        return (
            <div className="listMemo">
                <div className="listMemoSearch">
                    <input type="text" placeholder="キーワードを入力" />
                    <img src="/images/search-solid.svg" alt="search" />
                </div>
                <div className="listMemoTitle">
                    <span>Title</span>
                    <img src="/images/sort-amount-up-alt-solid.svg" alt="sort" />
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
        memoSelected: state.memoSelected,
        categorySelect: state.categorySelect,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMemoSelected: (memo) => {
            dispatch(Actions.changeMemoSelected(memo))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMemo)