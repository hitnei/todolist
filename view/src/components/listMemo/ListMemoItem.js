import React, { Component } from 'react'
import './ListMemoItem.css'

export default class ListMemoItem extends Component {
    render() {
        var {
                // memoID,
                // categoryID,
                memoTitle,
                // memoContent,
                memoDateCreated,
                // memoDeletDate,
                isClipped,
                // isDeleted
            } = this.props.memoItem
        var {categoryName, isSelected} = this.props
        return (
            <div className="listMemoItem">
                <div className={isSelected? "ItemSelected" : "ItemUnselected"}></div>
                <div className="memoItem">
                    <div>
                        <span className="memoItemTitle">{memoTitle}</span>
                        <div className="memoItemDetail">
                            <div className="memoItemTime">
                                <img src="/images/clock-regular.svg" alt="clock"/>
                                <span>{memoDateCreated.toDateString()}</span>
                            </div>
                            <div className="memoItemCategoty">
                                <img src="/images/tag-solid.svg" alt="clock"/>
                                <span>{categoryName}</span>
                            </div>
                        </div>
                    </div>
                    {isClipped? <img className="MemoItemClip" src="/images/paperclip-solid-1.svg" alt="sticky orange"/> : <div></div>}
                </div>
            </div>
        )
    }
}
