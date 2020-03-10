import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import { connect } from "react-redux";
import * as Actions from './../../actions/index';
import ClickNHold from 'react-click-n-hold';
// import * as Actions from './../../actions/index';
import './MemoDetailContent.css'

class MemoDetailContent extends Component {
    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            memo: this.props.memoSelected,
            idCategory: null
        }
    };

    onHandleChangeMemo = (e) => {
        var { value } = e.target
        var name = e._targetInst.pendingProps.id
        var { memoSelected } = this.props
        var cateName = ""
        if (e.target.name === 'categoryName') {
            cateName = value
            var { allCategory } = this.props
            allCategory.forEach((cate) => {
                if (cate.categoryName === value) {
                    memoSelected['IDCategory'] = cate._id
                    return;
                }
            })
        }
        else {
            memoSelected[name] = value
        }
        this.props.onChangeMemo(memoSelected, cateName)
    }

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

    onHandleChange = (e) => {
        var { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    start(e){
		console.log('START'); 
	} 
    
	end(e, enough){
		console.log('END');
        console.log(enough ? 'Click released after enough time': 'Click released too soon');            
	} 

    render() {
        var { memoSelected, isDisableEditContent, allCategory } = this.props
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

        var categoryName = ""
        allCategory.map((category, index) => {
            if (category._id === memoSelected.IDCategory) {
                return categoryName = category.categoryName
            }
            return ""
        })

        return (
            <ClickNHold
                time={1} // Time to keep pressing. Default is 2
                onStart={this.start} // Start callback
                onClickNHold={() => this.props.onSaveMemo()} //Timeout callback
                onEnd={this.end} // Click release callback
            >
                <div className="memoDetailcontent">
                    <div className="memoDetailcontent-header">
                        <div className="memoDetailcontent-time">
                            <img src="/images/clock-regular-black.svg" alt="clock regular black" />
                            <span>{created}</span>
                        </div>
                        <div className="memoDetailcontent-category">
                            <img src="/images/tag-solid-black.svg" alt="clock regular black" />
                            {
                                isDisableEditContent ?
                                    <span>{categoryName}</span>
                                    :
                                    <div className="listdata">
                                        <input type="text" list="dataCategory" name="categoryName" defaultValue={categoryName} onChange={this.onHandleChangeMemo} />
                                        <datalist id="dataCategory">
                                            {this.showListCategoryOption(allCategory)}
                                        </datalist>
                                    </div>
                            }
                        </div>
                    </div>
                    <ContentEditable
                        id="title"
                        className="memoDetailcontent-title"
                        // innerRef={this.contentEditable}
                        html={title ? title : ''} // innerHTML of the editable div
                        disabled={isDisableEditContent}       // use true to disable editing
                        onChange={this.onHandleChangeMemo} // handle innerHTML change
                        tagName='article' // Use a custom HTML tag (uses a div by default)
                        onBlur={''} // when selected (add late)
                    />
                    <ContentEditable
                        id="content"
                        className="memoDetailcontent-content"
                        // innerRef={this.contentEditable}
                        html={content ? content : ''} // innerHTML of the editable div
                        disabled={isDisableEditContent}       // use true to disable editing
                        onChange={this.onHandleChangeMemo} // handle innerHTML change
                        tagName='article' // Use a custom HTML tag (uses a div by default)
                        onBlur={''} // when selected (add late)
                    />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetailContent)