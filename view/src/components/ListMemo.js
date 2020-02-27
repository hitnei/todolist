import React, { Component } from 'react'
import { connect } from "react-redux";
import ListMemoItem from './listMemo/ListMemoItem'
import * as Actions from './../actions/index';
import './ListMemo.css'

class ListMemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            desort: -1
        }
    }
    
    showListMemo = (listMemoSelected) => {
        var {searchValue} = this.state
        listMemoSelected = this.listMemoSearch(searchValue)
        listMemoSelected = this.listMemoSort(listMemoSelected)
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

    listMemoSort = (listMemoSelected) => {
        var {desort} = this.state
        listMemoSelected = listMemoSelected.sort((memo1, memo2) => {
            var title1 = memo1.title.toLowerCase()
            var title2 = memo2.title.toLowerCase()
            var date1 = this.formatDate(new Date(memo1.createDate))
            var date2 = this.formatDate(new Date(memo2.createDate))
            return (title1 < title2)? desort : (title1 > title2)? -desort : (date1 < date2)? desort : (date1 > date2)? -desort : 0;
        })
        return listMemoSelected
    }

    listMemoSearch = (searchValue) => {
        var {listMemoSelected} = this.props
        if (searchValue === "") return listMemoSelected
        return listMemoSelected.filter((memo) => {
            var {title, createDate} = memo
            var created = this.formatDate(createDate)
            title = title.toLowerCase()
            searchValue = searchValue.toLowerCase()
            return title.includes(searchValue) || created.includes(searchValue)
        })
    }

    formatDate = (createDate) => {
        var created = new Date(createDate)
        var createYear = created.getFullYear()
        var createMonth = created.getMonth() + 1
        createMonth = (createMonth<10)? ("0" + createMonth) : (createMonth)
        var createDay = created.getDate()
        created = createYear + "/" + createMonth + "/" + createDay
        return created
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
          [name]: value,
        });
    }

    onChangeDesort = () => {
        var {desort} = this.state
        this.setState({desort: -desort})
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
                <div className="listMemoTitle" onClick={this.onChangeDesort}>
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