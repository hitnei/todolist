import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import { connect } from "react-redux";
// import * as Actions from './../../actions/index';
import './MemoDetailContent.css'

class MemoDetailContent extends Component {
    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {

        }
    };

    onHandleChange = (e) => {
        // console.log(e._targetInst.stateNode.title)
        // var { target } = e;
        // var { stateNode } = e._targetInst;
        // var name = stateNode.title;
        // var value = target.value;
        // this.setState({
        //     [name]: value,
        // });
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
                    className="memoDetailcontent-title"
                    innerRef={this.contentEditable}
                    html={title ? title : ''} // innerHTML of the editable div
                    disabled={isDisableEditContent}       // use true to disable editing
                    onChange={this.onHandleChange} // handle innerHTML change
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                    onBlur={''} // when selected (add late)
                />
                <ContentEditable
                    className="memoDetailcontent-content"
                    innerRef={this.contentEditable}
                    html={content ? content : ''} // innerHTML of the editable div
                    disabled={isDisableEditContent}       // use true to disable editing
                    onChange={this.onHandleChange} // handle innerHTML change
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                    onBlur={''} // when selected (add late)
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDisableEditContent: state.isDisableEditContent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetailContent)