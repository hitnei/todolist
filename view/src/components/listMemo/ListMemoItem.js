import React, { Component } from 'react'
import { connect } from "react-redux";
import './ListMemoItem.css'

class ListMemoItem extends Component {

    getCategoryName = () => {
        var {allCategory, memoItem} = this.props
        var {IDCategory} = memoItem
        var categoryName = ""
        allCategory.filter(category => {
            if (category._id === IDCategory) return categoryName = category.categoryName
            return ""
        })
        return categoryName
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
        var created = new Date(createDate)
        var createYear = created.getFullYear()
        var createMonth = created.getMonth()
        createMonth = (createMonth < 10) ? ("0" + createMonth) : (createMonth)
        var createDay = created.getDate()
        created = createYear + "/" + createMonth + "/" + createDay
        return (
            <div className="listMemoItem">
                <div className={isSelected ? "ItemSelected" : "ItemUnselected"}></div>
                <div className="memoItem">
                    <div>
                        <span className="memoItemTitle">{title}</span>
                        <div className="memoItemDetail">
                            <div className="memoItemTime">
                                <img src="/images/clock-regular.svg" alt="clock" />
                                <span>{created}</span>
                            </div>
                            <div className="memoItemCategoty">
                                <img src="/images/tag-solid.svg" alt="clock" />
                                <span>{this.getCategoryName()}</span>
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
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMemoItem)