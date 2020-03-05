import React, { Component } from 'react'
import { CALLAPI } from './../Config'
import { connect } from "react-redux";
import * as Actions from './../actions/index';
import './Category.css'

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: "all",
            showListCategory: true,
            onCreate: false,
            categoryName: "",
            title: "",
            content: ""
        }
    }

    showListCategory = (listCategory) => {
        var { categorySelect } = this.props
        var { showListCategory } = this.state
        if (!showListCategory) return ""
        return listCategory.map((category, index) => {
            return (
                category.categoryAmount ? <div className={categorySelect !== 'all' && categorySelect !== 'clip' && categorySelect === category._id ? "category-item category-selected" : "category-item"} key={category._id} onClick={(event, data) => this.onChangeCategorySelect(event, category._id)}>
                    <img className="category-image__categories" src="/images/tag-category.svg" alt="tags-solid" />
                    <input className="category-button category-button__categories category-category" type="button" value={category.categoryName} />
                    <span>{category.categoryAmount ? category.categoryAmount : 0}</span>
                </div>
                    :
                    ""
            )
        })
    }

    showListCategoryOption = (listCategory) => {
        return listCategory.map((category) => {
            return <option value={category.categoryName} />
        })
    }

    onChangeCategorySelect = (event, data) => {
        if (data === 'category')
            this.setState({ showListCategory: !this.state.showListCategory })
        else this.props.changeCategorySelect(data)
    }

    onChangeCreate = () => {
        var { onCreate } = this.state
        this.setState({
            onCreate: !onCreate,
            categoryName: "",
            title: "",
            content: ""
        })
    }

    onHandleChange = (e) => {
        var { target } = e
        var { name, value } = target
        this.setState({
            [name]: value
        })
    }

    onCreateCategory = () => {
        var { categoryName, title, content } = this.state
        if (categoryName !== "" && title !== "" && content !== "") {
            CALLAPI('post', 'category/createCategory', { categoryName: categoryName }, true)
                .then(data => {
                    if (data.err) {
                        console.log("err: " + data.err)
                    } else {
                        var { category } = data.data
                        var { _id } = category
                        this.props.changeOrAddCategory(category)
                        CALLAPI('post', 'memo/createMemo', { IDCategory: _id, title: title, content: content }, true)
                            .then(data => {
                                this.props.addMemoListMemo(data.data.memo)
                                this.setState({
                                    categoryName: "",
                                    title: "",
                                    content: "",
                                })
                                this.onChangeCreate()
                            })
                    }
                })
        }
    }

    render() {
        var { allCategory, listMemo, categorySelect } = this.props
        var { onCreate, categoryName, title, content } = this.state
        var numberAllCategory = 0;
        allCategory.map((category, index) => {
            var amount = (typeof category.categoryAmount && category.categoryAmount) ? category.categoryAmount : 0
            return numberAllCategory += parseInt(amount)
        })
        var numberClipped = 0;
        listMemo.map((memo, index) => {
            return memo.isClip && !memo.isDelete ? numberClipped++ : numberClipped
        })
        var numberDeleted = 0;
        listMemo.map((memo, index) => {
            return memo.isDelete ? numberDeleted++ : numberDeleted
        })
        return (
            <div>
                {!onCreate ?
                    <div className="category">
                        <div className="category-top">
                            <div className="category-item__top" onClick={this.onChangeCreate}>
                                <img className="category-image" src="/images/plus-solid.svg" alt="plus" />
                                <input className="category-button category-create__new" type="button" value='Create New' />
                            </div>
                            <div className={categorySelect === 'all' ? "category-item category-selected" : "category-item"} onClick={(event, data) => this.onChangeCategorySelect(event, 'all')}>
                                <img className="category-image" src="/images/sticky-note-solid.svg" alt="plus" />
                                <input className="category-button category-all__note" type="button" value='All Notes' />
                                <span>{numberAllCategory}</span>
                            </div>
                            <div onClick={(event, name) => this.onChangeCategorySelect(event, "category")}>
                                <img className="category-image" src="/images/tags-solid.svg" alt="tags-solid" />
                                <input className="category-button category-category" type="button" value='Category' />
                            </div>
                            {/*  */}
                            <div className="category-list">
                                {this.showListCategory(allCategory)}
                            </div>
                            {/*  */}
                            <div className={categorySelect === 'clip' ? "category-item category-selected" : "category-item"} onClick={(event, data) => this.onChangeCategorySelect(event, 'clip')}>
                                <img className="category-image" src="/images/paperclip-solid.svg" alt="paperclip-solid" />
                                <input className="category-button category-clip" type="button" value='Clip' />
                                <span>{numberClipped}</span>
                            </div>
                        </div>
                        <div className="category-bottom">
                            <div className={categorySelect === 'delete' ? "category-item category-selected" : "category-item"} onClick={(event, data) => this.onChangeCategorySelect(event, 'delete')}>
                                <img className="category-image__delete" src="/images/delete.svg" alt="delete" />
                                <input className="category-button category-clip" type="button" value='Delete' />
                                {numberDeleted ? <span>{numberDeleted <= 0 ? "" : numberDeleted}</span> : ''}
                            </div>
                        </div>
                    </div> :
                    <div className="category-create">
                        <span>Create New</span>
                        <div className="category-create__form">
                            <div>
                                <label>Choose or create category:</label>
                                <input type="text" list="dataCategory" name="categoryName" value={categoryName} onChange={this.onHandleChange} />
                                <datalist id="dataCategory">
                                    {this.showListCategoryOption(allCategory)}
                                </datalist>
                            </div>
                            <div>
                                <label>Title:</label>
                                <input name="title" value={title} onChange={this.onHandleChange} />
                            </div>
                            <div>
                                <label>Content:</label>
                                <textarea name="content" value={content} onChange={this.onHandleChange}>

                                </textarea>
                            </div>
                            <div className="category-btn__back">
                                <input type="button" value="Create" onClick={this.onCreateCategory} />
                                <input type="button" value="Back" onClick={this.onChangeCreate} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allCategory: state.allCategory,
        listMemo: state.listMemo,
        categorySelect: state.categorySelect,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCategorySelect: (data) => {
            dispatch(Actions.changeCategorySelect(data))
        },
        addMemoListMemo: (memo) => {
            dispatch(Actions.addMemoListMemo(memo))
        },
        changeOrAddCategory: (category) => {
            dispatch(Actions.changeOrAddCategory(category))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)