import React, { Component } from 'react'
import { connect } from "react-redux";
import * as Actions from './../../actions/index';
import './ListMemoItem.css'

class ListMemoItem extends Component {

    getCategoryName = () => {
        var { allCategory, memoItem } = this.props
        var { IDCategory } = memoItem
        var categoryName = ""
        allCategory.filter(category => {
            if (category._id === IDCategory) return categoryName = category.categoryName
            return ""
        })
        return categoryName
    }

    onChangeMemoSelected = (event, memo) => {
        this.props.changeMemoSelected(memo)
        this.props.disableEditContent()
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

    formatText = (text, limit = 9) => {
        return text.length > limit ? (text.slice(0, limit) + "...") : text
    }

    render() {
        var { isSelected, memoItem } = this.props
        var {
            // _id,
            // IDCategory,
            title,
            // content,
            createDate,
            // dateDelete,
            isClip,
            // idDelete
        } = memoItem
        // create date
        var created = this.formatDate(createDate)
        return (
            <div className="listMemoItem" onClick={(event, memo) => this.onChangeMemoSelected(event, memoItem)}>
                <div className={isSelected ? "ItemSelected" : "ItemUnselected"}></div>
                <div className="memoItem">
                    <div>
                        <span className="memoItemTitle">{this.formatText(title, 20)}</span>
                        <div className="memoItemDetail">
                            <div className="memoItemTime">
                                <img src="/images/clock-regular.svg" alt="clock" />
                                <span>{created}</span>
                            </div>
                            <div className="memoItemCategoty">
                                <img src="/images/tag-solid.svg" alt="clock" />
                                <span>{this.formatText(this.getCategoryName(), 15)}</span>
                            </div>
                        </div>
                    </div>
                    {isClip ? <img className="MemoItemClip" src="/images/paperclip-solid-1.svg" alt="sticky orange" /> : <div></div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allCategory: state.allCategory,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMemoItem)