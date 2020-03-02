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
        default:
            return state
    }
};
export default listMemo;