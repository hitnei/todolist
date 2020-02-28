import React, { Component } from 'react'
import { connect } from "react-redux";
import * as Actions from './../../actions/index';
import './ListMemoItem.css'

class ListMemoItem extends Component {

    onChangeMemoSelected = (event, memo) => {
        this.props.changeMemoSelected(memo)
    }

    render() {
        var {categoryName, isSelected, memoItem} = this.props
        var {
                // _id,
                // IDCategory,
                title,
                // content,
                createDate,
                // dateDelete,
                isClip,
                // idDelete
            } = memoItem
        // create date
        var created = new Date(createDate)
        var createYear = created.getFullYear()
        var createMonth = created.getMonth() + 1
        createMonth = (createMonth<10)? ("0" + createMonth) : (createMonth)
        var createDay = created.getDate()
        created = createYear + "/" + createMonth + "/" + createDay
        return (
            <div className="listMemoItem" onClick={(event, memo) => this.onChangeMemoSelected(event, memoItem)}>
                <div className={isSelected? "ItemSelected" : "ItemUnselected"}></div>
                <div className="memoItem">
                    <div>
                        <span className="memoItemTitle">{title}</span>
                        <div className="memoItemDetail">
                            <div className="memoItemTime">
                                <img src="/images/clock-regular.svg" alt="clock"/>
                                <span>{created}</span>
                            </div>
                            <div className="memoItemCategoty">
                                <img src="/images/tag-solid.svg" alt="clock"/>
                                <span>{categoryName}</span>
                            </div>
                        </div>
                    </div>
                    {isClip? <img className="MemoItemClip" src="/images/paperclip-solid-1.svg" alt="sticky orange"/> : <div></div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
        changeMemoSelected: (memo) => {
            dispatch(Actions.changeMemoSelected(memo))
        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListMemoItem)