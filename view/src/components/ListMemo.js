import React, { Component } from 'react'
import './ListMemo.css'

export default class ListMemo extends Component {
    render() {
        return (
            <div className="listMemo">
                <div className="listMemoSearch">
                    <input type="text" placeholder="キーワードを入力"/>
                    <img src="/images/search-solid.svg" alt="search"/>
                </div>
                <div className="listMemoTitle">
                    <span>Title</span>
                    <img src="/images/sort-amount-up-alt-solid.svg" alt="sort"/>
                </div>
                <div className="listMemoShortcut">
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
                    <div className="listMemoItem">
                        <div className="ItemUnselected"></div>
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
                            {/* <img className="MemoItemClip" src="/images/paperclip-solid-1.svg" alt="sticky orange"/> */}
                        </div>
                    </div>
                    <div className="listMemoItem">
                        <div className="ItemUnselected"></div>
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
                            {/* <img className="MemoItemClip" src="/images/paperclip-solid-1.svg" alt="sticky orange"/> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
