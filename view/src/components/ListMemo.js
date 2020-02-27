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
    
    showListMemo = (listMemoSelected) => {
        var {searchValue} = this.state
        listMemoSelected = this.listMemoSearch(searchValue)
        return listMemoSelected.map((memo, index) => {
            if (index === 0) this.props.changeMemoSelected(memo)
            var {memoSelected, allCategory} = this.props
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

    listMemoSearch = (searchValue) => {
        var {listMemoSelected} = this.props
        if (searchValue === "") return listMemoSelected
        return listMemoSelected.filter((memo) => {
            var {title} = memo
            title = title.toLowerCase()
            searchValue = searchValue.toLowerCase()
            return title.includes(searchValue)
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
        var {listMemoSelected} = this.props
        var {searchValue} = this.state
        return (
            <div className="listMemo">
                <div className="listMemoSearch">
                    <input type="text" placeholder="キーワードを入力" name="searchValue" onChange={this.onHandleChange} value={searchValue} />
                    <img src="/images/search-solid.svg" alt="search"/>
                </div>
                <div className="listMemoTitle">
                    <span>Title</span>
                    <img src="/images/sort-amount-up-alt-solid.svg" alt="sort"/>
                </div>
                <div className="listMemoShortcut">
                    {this.showListMemo(listMemoSelected)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listMemoSelected: state.listMemoSelected,
        allCategory: state.allCategory,
        memoSelected: state.memoSelected,
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
        changeMemoSelected: (id) => {
            dispatch(Actions.changeMemoSelected(id))
        },
        changeListMemoSelected: (data) => {
            dispatch(Actions.changeListMemoSelected(data))
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListMemo)