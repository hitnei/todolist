import React, { Component } from 'react'
import './MemoDetailContent.css'

export default class MemoDetailContent extends Component {

    formatDate = (createDate) => {
        var created = new Date(createDate)
        var createYear = created.getFullYear()
        var createMonth = created.getMonth() + 1
        createMonth = (createMonth < 10) ? ("0" + createMonth) : (createMonth)
        var createDay = created.getDate()
        created = createYear + "/" + createMonth + "/" + createDay
        return created
    }

    render() {
        var { categoryName, memoSelected } = this.props
        var {
            // _id,
            // IDCategory,
            // IDUser,
            title,
            content,
            createDate,
            // dateDelete,
            // isClip,
            // idDelete,
        } = memoSelected
        // create date
        var created = this.formatDate(createDate)
        return (
            <div className="memoDetailcontent">
                <div className="memoDetailcontent-header">
                    <div className="memoDetailcontent-time">
                        <img src="/images/clock-regular-black.svg" alt="clock regular black" />
                        <span>{created}</span>
                    </div>
                    <div className="memoDetailcontent-category">
                        <img src="/images/tag-solid-black.svg" alt="clock regular black" />
                        <span>{categoryName}</span>
                    </div>
                </div>
                <div className="memoDetailcontent-title">
                    {title}
                </div>
                <div className="memoDetailcontent-content">
                    {content}
                </div>
            </div>
        )
    }
}
