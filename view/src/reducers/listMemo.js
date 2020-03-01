import * as types from './../constants/ActionTypes';

var InitialState = []

const listMemo = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_LISTMEMO:
            state = action.data;
            return [...state];
        case types.CHANGE_MEMO_ISCLIP:
            var {id} = action
            state = state.map((memo) => {
                if (memo._id === id) {
                    memo.isClip = !memo.isClip
                }
                return memo
            })
            console.log(state)
            return [...state];
        default:
            return state
    }
};
export default listMemo;