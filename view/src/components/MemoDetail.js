import React, { Component } from 'react'
import { CALLAPI } from './../Config'
import { connect } from "react-redux";
import * as Actions from './../actions/index';
import MemoDetailHeader from './memoDetail/MemoDetailHeader'
import MemoDetailContent from './memoDetail/MemoDetailContent'
import './MemoDetail.css'

class MemoDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cateName: "",
            memoTitle: "",
            memoContent: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        var { allCategory, memoSelected } = nextProps
        var categoryName = ""
        allCategory.forEach((category, index) => {
            if (category._id === memoSelected.IDCategory) {
                categoryName = category.categoryName
            }
        })
        this.setState({
            memoTitle: memoSelected.title,
            memoContent: memoSelected.content,
            cateName: categoryName,
        })
    }

    onSaveMemo = () => {
        var { cateName, memoTitle, memoContent } = this.state
        var { memoSelected } = this.props
        var memo = memoSelected
        // memo.title = memoTitle
        // memo.content = memoContent

        // var idCate = ''
        // allCategory.forEach(cate => {
        //     if (cate.categoryName === cateName) {
        //         idCate = cate._id
        //         return
        //     }
        // })

        if (memoTitle && memoContent) {
            this.props.changeLoading()
            CALLAPI('post', 'category/createCategory', { categoryName: cateName }, true)
                .then(data => {
                    if (data.status === 200 || data.status === 201) {
                        // 200 -> created, 201 -> had category
                        memo.IDCategory = data.data.category._id
                        this.props.changeOrAddCategory(data.data.category)

                        memo.title = memoTitle
                        memo.content = memoContent
                        CALLAPI('post', 'memo/editMemo', { memo: memo }, true)
                            .then(data => {
                                if (data.status === 200) {
                                    var newMemo = data.data.memo
                                    this.props.disableEditContent()
                                    this.props.changeListMemoById(newMemo)
                                    this.props.changeMemoSelected(newMemo)
                                    this.setState({ memo: {} })
                                } else {
                                    // failure
                                }
                                this.props.changeLoading()
                            })
                    } else {
                        // failure
                    }
                })

        }
    }

    // onChangeMemo = (memo, cateName) => {
    //     this.setState({ memo, cateName })
    // }


    onChangeCate = (e) => {
        var { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    render() {
        var { memoSelected } = this.props
        var { memoTitle, memoContent, cateName } = this.state
        return (
            <div className="memoDetail">
                <MemoDetailHeader memoSelected={memoSelected} onSaveMemo={this.onSaveMemo} />
                <MemoDetailContent
                    onSaveMemo={this.onSaveMemo}
                    onChangeCate={this.onChangeCate}
                    memoTitle={memoTitle}
                    memoContent={memoContent}
                    cateName={cateName}

                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        memoSelected: state.memoSelected,
        allCategory: state.allCategory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        disableEditContent: () => {
            dispatch(Actions.disableEditContent())
        },
        changeListMemoById: (memo) => {
            dispatch(Actions.changeListMemoById(memo))
        },
        changeMemoSelected: (memo) => {
            dispatch(Actions.changeMemoSelected(memo))
        },
        changeOrAddCategory: (category) => {
            dispatch(Actions.changeOrAddCategory(category))
        },
        changeLoading: () => {
            dispatch(Actions.changeLoading())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail)
