import React, { Component } from 'react'
import { connect } from "react-redux";
import * as Actions from './../actions/index';
import './Category.css'

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: "all",
            isShowListCategory: true
        }
    }
    showListCategory = (listCategory) => {
        var { selected, isShowListCategory } = this.state
        if (isShowListCategory) {
            return listCategory.map((category, index) => {
                return (
                    // category.categoryAmount ? 
                    <div className={selected === index ? "category-item category-selected" : "category-item"} key={category._id} onClick={(name) => this.itemSelected(index)}>
                        <img className="category-image__categories" src="/images/tag-category.svg" alt="tags-solid" />
                        <input className="category-button category-button__categories category-category" type="button" value={category.categoryName} />
                        <span>{category.categoryAmount ? category.categoryAmount : 0}</span>
                    </div>
                        // :
                        // ""
                )
            })
        } else return ""
    }

    itemSelected = (name) => {
        this.setState({selected: name})
        if (name === "category") {
            var {isShowListCategory} = this.state
            this.setState({isShowListCategory: !isShowListCategory})
        }
        // change listmemos when click
        var listMemoTemp = this.props.listMemoSelected
        if (name === "all") {
            listMemoTemp = this.props.listMemo
        } else if (name === "clip") {
            listMemoTemp = this.props.listMemoSelected.filter((memo, index) => {
                return memo.isClip
            })
        } else if (typeof name === "number") {
            var {allCategory, listMemo} = this.props
            var idCategory = allCategory[name]._id
            listMemoTemp = listMemo.filter((memo) => {
                return memo.IDCategory === idCategory
            })
        }
        this.props.changeListMemoSelected(listMemoTemp)
    }

    render() {
        var {allCategory, listMemo} = this.props
        var {selected} = this.state
        var numberAllCategory = 0;
        allCategory.map((category, index) => {
            var amount = (typeof category.categoryAmount && category.categoryAmount)? category.categoryAmount : 0
            return numberAllCategory += parseInt(amount)
        })
        var numberClipped = 0;
        listMemo.map((memo, index) => {
            return memo.isClip? numberClipped++ : numberClipped
        })
        return (
            <div className="category">
                <div className="category-top">
                    <div className="category-item__top">
                        <img className="category-image" src="/images/plus-solid.svg" alt="plus"/>
                        <input className="category-button category-create__new" type="button" value='Create New'/>
                    </div>
                    <div className={selected==="all"? "category-item category-selected" : "category-item"} onClick={(name) => this.itemSelected("all")}>
                        <img className="category-image" src="/images/sticky-note-solid.svg" alt="plus"/>
                        <input className="category-button category-all__note" type="button" value='All Notes'/>
                        <span>{numberAllCategory}</span>
                    </div>
                    <div className={selected==="category"? "category-item category-selected" : "category-item"}  onClick={(name) => this.itemSelected("category")}>
                        <img className="category-image" src="/images/tags-solid.svg" alt="tags-solid"/>
                        <input className="category-button category-category" type="button" value='Category'/>
                    </div>
                    {/*  */}
                    <div className="category-list">
                        {this.showListCategory(allCategory)}
                    </div>
                    {/*  */}
                    <div className={selected==="clip"? "category-item category-selected" : "category-item"} onClick={(name) => this.itemSelected("clip")}>
                        <img className="category-image" src="/images/paperclip-solid.svg" alt="paperclip-solid"/>
                        <input className="category-button category-clip" type="button" value='Clip'/>
                        <span>{numberClipped}</span>
                    </div>
                </div>
                <div className="category-bottom">
                    <div className="">
                        <img className="category-image__delete" src="/images/delete.svg" alt="delete"/>
                        <input className="category-button category-clip" type="button" value='Delete'/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      allCategory: state.allCategory,
      listMemoSelected: state.listMemoSelected,
      listMemo: state.listMemo,
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
        changeListMemoSelected: (data) => {
            dispatch(Actions.changeListMemoSelected(data))
        }
    }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Category)