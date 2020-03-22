import React, { Component } from 'react'
import { connect } from "react-redux";
import * as Actions from './../../actions/index';
import ClickNHold from 'react-click-n-hold';
import { CALLAPI } from './../../Config'
// import * as Actions from './../../actions/index';
import './MemoDetailContent.css'

class MemoDetailContent extends Component {
    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            memo: this.props.memoSelected,
            idCategory: null,
        }
    };

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

    showListCategoryOption = (listCategory) => {
        return listCategory.map((category) => {
            return <option key={category._id} value={category.categoryName} />
        })
    }

    start(e) {
        console.log('START');
    }

    end(e, enough) {
        console.log('END');
        console.log(enough ? 'Click released after enough time' : 'Click released too soon');
    }

    onChangeCate = (e) => {
        this.props.onChangeCate(e)
    }

    onCreateMemo = () => {
        var { cateName, memoTitle, memoContent } = this.state
        if (cateName !== '' && memoTitle !== '' && memoContent !== '') {
            this.props.changeLoading()
            CALLAPI('post', 'category/createCategory', { categoryName: cateName }, true)
                .then(data => {
                    if (data.err) {
                        console.log("err: " + data.err)
                    } else {
                        var { category } = data.data
                        var { _id } = category
                        this.props.changeOrAddCategory(category)
                        CALLAPI('post', 'memo/createMemo', { IDCategory: _id, title: memoTitle, content: memoContent }, true)
                            .then(data => {
                                this.props.addMemoListMemo(data.data.memo)
                                this.setState({
                                    cateName: "",
                                    title: "",
                                    content: "",
                                })
                            })
                    }
                    this.props.changeLoading()
                })
                .catch(err => {
                    console.log(err)
                    this.props.changeLoading()
                })
        } else {
            console.log("show caution")
        }
    }

    start = () => {
        this.props.changeIsShowCategory(false)
        this.props.changeIsShowListMemo(false)
    }

    render() {
        var { memoSelected, isDisableEditContent, allCategory, memoTitle, memoContent, cateName } = this.props
        var {
            _id,
            // IDCategory,
            // IDUser,
            // title,
            // content,
            createDate,
            // dateDelete,
            // isClip,
            // idDelete,
        } = memoSelected
        // create date
        var created = this.formatDate(createDate)

        return (
            <ClickNHold
                time={1} // Time to keep pressing. Default is 2
                onStart={this.start} // Start callback
                onClickNHold={() => this.props.onSaveMemo()} //Timeout callback
            // onEnd={this.end} // Click release callback
            >
                <div className="memoDetailcontent">
                    {
                        _id ?
                            <div>
                                <div className="memoDetailcontent-header">
                                    <div className="memoDetailcontent-time">
                                        <img src="/images/clock-regular-black.svg" alt="clock regular black" />
                                        <span>{created}</span>
                                    </div>
                                    <div className="memoDetailcontent-category">
                                        <img src="/images/tag-solid-black.svg" alt="clock regular black" />
                                        {isDisableEditContent ?
                                            <span>{cateName}</span>
                                            :
                                            <div className="listdata">
                                                <input type="text" list="dataCategory" name="cateName" value={cateName} onChange={this.onChangeCate} />
                                                <datalist id="dataCategory">
                                                    {this.showListCategoryOption(allCategory)}
                                                </datalist>
                                            </div>}
                                    </div>
                                </div>
                                {(isDisableEditContent) ?
                                    <input className="memoDetailcontent-title" name="memoTitle" value={memoTitle ? memoTitle : ''} onChange={this.onChangeCate} placeholder="Enter Title" disabled />
                                    :
                                    <input className="memoDetailcontent-title" name="memoTitle" value={memoTitle ? memoTitle : ''} onChange={this.onChangeCate} placeholder="Enter Title" />
                                }

                                {(isDisableEditContent) ?
                                    <textarea className="memoDetailcontent-content" name="memoContent" value={memoContent ? memoContent : ''} onChange={this.onChangeCate} placeholder="Enter Content" disabled />
                                    :
                                    <textarea className="memoDetailcontent-content" name="memoContent" value={memoContent ? memoContent : ''} onChange={this.onChangeCate} placeholder="Enter Content" />
                                }
                            </div>
                            :
                            (
                                <div className="noMemo">
                                    <input className="memoDetailcontent-title" name="cateName" value={cateName ? cateName : ''} onChange={this.onChangeCate} placeholder="Enter Category" />
                                    <input className="memoDetailcontent-title memoDetailcontent-noTitle" name="memoTitle" value={memoTitle ? memoTitle : ''} onChange={this.onChangeCate} placeholder="Enter Title" />
                                    <textarea className="memoDetailcontent-content memoDetailcontent-noContent" name="memoContent" value={memoContent ? memoContent : ''} onChange={this.onChangeCate} placeholder="Enter Content" />
                                    <div className="btn">
                                        <input type='button' value='Create' onClick={this.onCreateMemo} />
                                    </div>
                                </div>
                            )
                    }
                </div>
            </ClickNHold>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDisableEditContent: state.isDisableEditContent,
        memoSelected: state.memoSelected,
        allCategory: state.allCategory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMemoSelected: (memo) => {
            dispatch(Actions.changeMemoSelected(memo))
        },
        changeLoading: () => {
            dispatch(Actions.changeLoading())
        },
        changeOrAddCategory: (category) => {
            dispatch(Actions.changeOrAddCategory(category))
        },
        addMemoListMemo: (memo) => {
            dispatch(Actions.addMemoListMemo(memo))
        },
        changeIsShowCategory: (value) => {
            dispatch(Actions.changeIsShowCategory(value))
        },
        changeIsShowListMemo: (value) => {
            dispatch(Actions.changeIsShowListMemo(value))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetailContent)