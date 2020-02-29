import React, { Component } from 'react'
import { connect } from "react-redux";
import './Category.css'

class Category extends Component {

    showListCategory = (listCategory) => {
        return listCategory.map((category, index) => {
            return (
                category.categoryAmount ? <div className="category-item" key={category._id}>
                    <img className="category-image__categories" src="/images/tag-category.svg" alt="tags-solid" />
                    <input className="category-button category-button__categories category-category" type="button" value={category.categoryName} />
                    <span>{category.categoryAmount ? category.categoryAmount : 0}</span>
                </div>
                    :
                    ""
            )
        })
    }

    render() {
        var { allCategory, listMemo } = this.props
        var numberAllCategory = 0;
        allCategory.map((category, index) => {
            var amount = (typeof category.categoryAmount && category.categoryAmount) ? category.categoryAmount : 0
            return numberAllCategory += parseInt(amount)
        })
        var numberClipped = 0;
        listMemo.map((memo, index) => {
            return memo.isClipped ? numberClipped++ : numberClipped
        })
        return (
            <div className="category">
                <div className="category-top">
                    <div className="category-item__top">
                        <img className="category-image" src="/images/plus-solid.svg" alt="plus" />
                        <input className="category-button category-create__new" type="button" value='Create New' />
                    </div>
                    <div className="category-item">
                        <img className="category-image" src="/images/sticky-note-solid.svg" alt="plus" />
                        <input className="category-button category-all__note" type="button" value='All Notes' />
                        <span>{numberAllCategory}</span>
                    </div>
                    <div className="">
                        <img className="category-image" src="/images/tags-solid.svg" alt="tags-solid" />
                        <input className="category-button category-category" type="button" value='Category' />
                    </div>
                    {/*  */}
                    <div className="category-list">
                        {this.showListCategory(allCategory)}
                    </div>
                    {/*  */}
                    <div className="category-item">
                        <img className="category-image" src="/images/paperclip-solid.svg" alt="paperclip-solid" />
                        <input className="category-button category-clip" type="button" value='Clip' />
                        <span>{numberClipped}</span>
                    </div>
                </div>
                <div className="category-bottom">
                    <div className="">
                        <img className="category-image__delete" src="/images/delete.svg" alt="delete" />
                        <input className="category-button category-clip" type="button" value='Delete' />
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)