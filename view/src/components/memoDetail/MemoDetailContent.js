import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import { connect } from "react-redux";
import * as Actions from './../../actions/index';
// import * as Actions from './../../actions/index';
import './MemoDetailContent.css'

class MemoDetailContent extends Component {
    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            memo: this.props.memoSelected
        }
    };

    onHandleChangeMemo = (e) => {
        var { value } = e.target
        var name = e._targetInst.pendingProps.id
        var { memoSelected } = this.props
        memoSelected[name] = value
        // this.props.changeMemoSelected(memoSelected)
        this.props.onChangeMemo(memoSelected)
    }

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
        var { categoryName, memoSelected, isDisableEditContent } = this.props
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDisableEditContent: state.isDisableEditContent,
        memoSelected: state.memoSelected
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