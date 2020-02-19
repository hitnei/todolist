import React, { Component } from 'react'
import MemoDetailHeader from './memoDetail/MemoDetailHeader'
import MemoDetailContent from './memoDetail/MemoDetailContent'
import './memoDetail.css'

export default class MemoDetail extends Component {
    render() {
        return (
            <div className="memoDetail">
                <MemoDetailHeader/>
                <MemoDetailContent/>
            </div>
        )
    }
}
