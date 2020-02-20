import React, { Component } from 'react'
import './MemoDetailContent.css'

export default class MemoDetailContent extends Component {
    render() {
        var {
            // memoID,
            // categoryID,
            memoTitle,
            memoContent,
            memoDateCreated,
            // memoDeleteDate,
            // isClipped,
            // isDeleted,
        } = this.props.memoSelected
        var {categoryName} = this.props
        return (
            <div className="memoDetailcontent">
                <div className="memoDetailcontent-header">
                    <div className="memoDetailcontent-time">
                        <img src="/images/clock-regular-black.svg" alt="clock regular black"/>
                        <span>{memoDateCreated.toDateString()}</span>
                    </div>
                    <div className="memoDetailcontent-category">
                        <img src="/images/tag-solid-black.svg" alt="clock regular black"/>
                        <span>{categoryName}</span>
                    </div>
                </div>
                <div className="memoDetailcontent-title">
                    {memoTitle}
                </div>
                <div className="memoDetailcontent-content">
                    {memoContent}
                </div>
            </div>
        )
    }
}
