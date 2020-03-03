import React, { Component } from 'react'
import { connect } from "react-redux";
import * as Actions from './../actions/index';
import './Category.css'

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: "all",
            showListCategory: true
        }
    }

    showListCategory = (listCategory) => {
        var {categorySelect} = this.props
        var {showListCategory} = this.state
        if (!showListCategory) return ""
        return listCategory.map((category, index) => {
            return (
                category.categoryAmount ? <div className={categorySelect!=='all' && categorySelect!=='clip' && categorySelect===category._id? "category-item category-selected" : "category-item"} key={category._id} onClick={(event, data) => this.onChangeCategorySelect(event, category._id)}>
                    <img className="category-image__categories" src="/images/tag-category.svg" alt="tags-solid" />
                    <input className="category-button category-button__categories category-category" type="button" value={category.categoryName} />
                    <span>{category.categoryAmount ? category.categoryAmount : 0}</span>
                </div>
                    :
                    ""
            )
        })
    }

    onChangeCategorySelect = (event, data) => {
        if (data === 'category')
            this.setState({showListCategory: !this.state.showListCategory})
        else this.props.changeCategorySelect(data)
    }

    render() {
        var { allCategory, listMemo, categorySelect } = this.props
        var numberAllCategory = 0;
        allCategory.map((category, index) => {
            var amount = (typeof category.categoryAmount && category.categoryAmount) ? category.categoryAmount : 0
            return numberAllCategory += parseInt(amount)
        })
        var numberClipped = 0;
        listMemo.map((memo, index) => {
            return memo.isClip && !memo.isDelete? numberClipped++ : numberClipped
        })
        var numberDeleted = 0;
        listMemo.map((memo, index) => {
            return memo.isDelete? numberDeleted++ : numberDeleted
        })
        return (
            <div className="category">
                <div className="category-top">
                    <div className="category-item__top">
                        <img className="category-image" src="/images/plus-solid.svg" alt="plus" />
                        <input className="category-button category-create__new" type="button" value='Create New' />
                    </div>
                    <div className={categorySelect==='all'? "category-item category-selected" : "category-item"} onClick={(event, data) => this.onChangeCategorySelect(event, 'all')}>
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
                    <div className={categorySelect==='clip'? "category-item category-selected" : "category-item"} onClick={(event, data) => this.onChangeCategorySelect(event, 'clip')}>
                        <img className="category-image" src="/images/paperclip-solid.svg" alt="paperclip-solid" />
                        <input className="category-button category-clip" type="button" value='Clip' />
                        <span>{numberClipped}</span>
                    </div>
                </div>
                <div className="category-bottom">
                    <div className={categorySelect==='delete'? "category-item category-selected" : "category-item"} onClick={(event, data) => this.onChangeCategorySelect(event, 'delete')}>
                        <img className="category-image__delete" src="/images/delete.svg" alt="delete" />
                        <input className="category-button category-clip" type="button" value='Delete' />
                        {numberDeleted? <span>{numberDeleted <= 0? "" : numberDeleted}</span> : ''}
                    </div>
                </div>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)