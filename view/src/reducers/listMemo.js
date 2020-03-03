import * as types from './../constants/ActionTypes';

var InitialState = []

const listMemo = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_LISTMEMO:
            state = action.data;
            return [...state];
        case types.CHANGE_MEMO_ISCLIP:
            var {id} = action
            state = state.map((memo, index) => {
                if (memo._id === id) {
                    var cloneMemo = {...memo}
                    cloneMemo.isClip = !cloneMemo.isClip
                    return cloneMemo
                }
                return memo
            })
            return [...state];
        case types.CHANGE_LISTMEMO_BY_ID:
            var { memo } = action
            state = state.map(val => {
                if (val._id === memo._id) {
                    return memo
                }
                return val
            })
            return [...state];
        default:
            return state
    }
};
export default listMemo;