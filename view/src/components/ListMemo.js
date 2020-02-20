import React, { Component } from 'react'
import './ListMemo.css'
import ListMemoItem from './listMemo/ListMemoItem'

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
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                    <ListMemoItem/>
                </div>
            </div>
        )
    }
}
