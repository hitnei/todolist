import React, { Component } from 'react'
import './ListMemoItem.css'

export default class ListMemoItem extends Component {
    render() {
        return (
            <div className="listMemoItem">
                <div className="ItemSelected"></div>
                <div className="memoItem">
                    <div>
                        <span className="memoItemTitle">Memo Title</span>
                        <div className="memoItemDetail">
                            <div className="memoItemTime">
                                <img src="/images/clock-regular.svg" alt="clock"/>
                                <span>2020/01/27</span>
                            </div>
                            <div className="memoItemCategoty">
                                <img src="/images/tag-solid.svg" alt="clock"/>
                                <span>Category-01</span>
                            </div>
                        </div>
                    </div>
                    <img className="MemoItemClip" src="/images/paperclip-solid-1.svg" alt="sticky orange"/>
                </div>
            </div>
        )
    }
}
