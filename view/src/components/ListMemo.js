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

    getListMemoSelect = (listMemo, categorySelect, isDelete = false) => {
        var list = []
        if (!isDelete) {
            list = categorySelect === 'all' ? listMemo.filter(memo => !memo.isDelete)
                : categorySelect === 'clip' ? listMemo.filter(memo => memo.isClip && !memo.isDelete)
                    : categorySelect === 'delete' ? listMemo.filter(memo => memo.isDelete)
                        : listMemo.filter(memo => memo.IDCategory === categorySelect && !memo.isDelete)
        } else {
            list = categorySelect === 'all' ? listMemo.filter(memo => !memo.isDelete)
                : categorySelect === 'clip' ? listMemo.filter(memo => !memo.isClip && memo.isDelete)
                    : categorySelect === 'delete' ? listMemo.filter(memo => memo.isDelete)
                        : listMemo.filter(memo => memo.IDCategory === categorySelect && !memo.isDelete)
        }
        return list
    }

    showListMemo = (listMemo) => {
        var { categorySelect, memoSelected } = this.props

        //search and sort
        var { searchValue } = this.state
        listMemo = this.listMemoSearch(searchValue)
        listMemo = this.listMemoSort(listMemo)
        //end

        var listMemoSelect = this.getListMemoSelect(listMemo, categorySelect)

        //set memo selected default
        if (!memoSelected._id) {
            this.props.changeMemoSelected(listMemoSelect[0])
            this.props.disableEditContent()
        }

        if (!listMemoSelect.includes(memoSelected)) {
            this.props.changeMemoSelected(listMemoSelect[0])
        }

        return listMemoSelect.map((memo, index) => {
            return <ListMemoItem key={memo._id} memoItem={memo} isSelected={memoSelected._id === memo._id ? true : false} />
        })
    }

    listMemoSearch = (searchValue) => {
        var { listMemo } = this.props
        if (searchValue === "") return listMemo
        return listMemo.filter((memo) => {
            var { title, createDate } = memo
            // format create date
            var created = this.formatDate(createDate)
            // end
            title = title.toLowerCase()
            searchValue = searchValue.toLowerCase()
            return title.includes(searchValue) || created.includes(searchValue)
        })
    }

    listMemoSort = (listMemo) => {
        // sort and desort by title and dateCreate as the same
        var { desort } = this.state
        listMemo = listMemo.sort((memo1, memo2) => {
            var title1 = memo1.title.toLowerCase()
            var title2 = memo2.title.toLowerCase()
            var date1 = this.formatDate(new Date(memo1.createDate))
            var date2 = this.formatDate(new Date(memo2.createDate))
            return (title1 < title2) ? desort : (title1 > title2) ? -desort : (date1 < date2) ? desort : (date1 > date2) ? -desort : 0;
        })
        return listMemo
    }

    onChangeDesort = () => {
        var { desort } = this.state
        this.setState({ desort: -desort })
    }

    formatDate = (createDate) => {
        var created = new Date(createDate)
        var createYear = created.getFullYear()
        var createMonth = created.getMonth() + 1
        createMonth = (createMonth < 10) ? ("0" + createMonth) : (createMonth)
        var createDay = created.getDate()
        createDay = (createDay < 10) ? ("0" + createDay) : (createDay)
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

    onShowCategory = () => {
        this.props.changeIsShowCategory(true)
    }

    render() {
        var { listMemo, categorySelect, isShowCategory } = this.props
        var { searchValue } = this.state
        var isNoMemo = this.getListMemoSelect(listMemo, categorySelect, true).length === 0 ? true : false
        return (
            <div className={!isShowCategory ? "listMemo" : "listMemo disableListMemo"}>
                <div className="listMemoSearch">
                    <input type="text" placeholder="キーワードを入力" name="searchValue" onChange={this.onHandleChange} value={searchValue} />
                    <img src="/images/search-solid.svg" alt="search" />
                </div>
                <div className="listMemoTitle">
                    <span>Title</span>
                    <div className="disableBack btnBack">
                        <img src="/images/arrowBack.svg" width="20px" alt="arrow back" />
                        <input type='button' value="Back" onClick={this.onShowCategory} />
                    </div>
                    <img src="/images/sort-amount-up-alt-solid.svg" alt="sort" onClick={this.onChangeDesort} />
                </div>
                <div className={isNoMemo ? "listMemoShortcut listMemoShortcut_none" : "listMemoShortcut"}>
                    {
                        isNoMemo ?
                            <div className="listMemoNone">
                                <img src="/images/noMemo.png" alt="no memo" />
                                <span>No Memo</span>
                            </div>
                            :
                            this.showListMemo(listMemo)
                    }
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
        isShowCategory: state.isShowCategory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMemoSelected: (memo) => {
            dispatch(Actions.changeMemoSelected(memo))
        },
        disableEditContent: () => {
            dispatch(Actions.disableEditContent())
        },
        changeIsShowCategory: (value) => {
            dispatch(Actions.changeIsShowCategory(value))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMemo)