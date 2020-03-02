import React, { Component } from 'react'
import { connect } from "react-redux";
import ListMemoItem from './listMemo/ListMemoItem'
import * as Actions from './../actions/index';
import './ListMemo.css'

class ListMemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: ""
        }
    }
    
    showListMemo = (listMemo) => {
        var {categorySelect, memoSelected} = this.props

        var {searchValue} = this.state
        listMemo = this.listMemoSearch(searchValue)

        var listMemoSelect = categorySelect === 'all'? listMemo 
        : categorySelect === 'clip'? listMemo.filter(memo => memo.isClip)
        : listMemo.filter(memo => memo.IDCategory === categorySelect)
        
        //set memo selected default
        if (!memoSelected._id) this.props.changeMemoSelected(listMemoSelect[0])
        
        return listMemoSelect.map((memo, index) => {
            return <ListMemoItem key={memo._id} memoItem={memo} isSelected={memoSelected._id === memo._id ? true : false} />
        })
    }

    listMemoSearch = (searchValue) => {
        var {listMemo} = this.props
        if (searchValue === "") return listMemo
        return listMemo.filter((memo) => {
            var {title, createDate} = memo
            // format create date
            var created = new Date(createDate)
            var createYear = created.getFullYear()
            var createMonth = created.getMonth()
            createMonth = (createMonth<10)? ("0" + createMonth) : (createMonth)
            var createDay = created.getDate()
            created = createYear + "/" + createMonth + "/" + createDay
            // end
            title = title.toLowerCase()
            searchValue = searchValue.toLowerCase()
            return title.includes(searchValue) || created.includes(searchValue)
        })
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
          [name]: value,
        });
    }

    render() {
        var { listMemo } = this.props
        var {searchValue} = this.state
        return (
            <div className="listMemo">
                <div className="listMemoSearch">
                    <input type="text" placeholder="キーワードを入力" name="searchValue" onChange={this.onHandleChange} value={searchValue} />
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