import * as types from './../constants/ActionTypes';

var InitialState = false
const isShowListMemo = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_IS_SHOW_LISTMEMO:
            if (typeof action.value !== 'undefined') {
                state = action.value;
            }
            return state;
        default:
            return state;
    }
};
export default isShowListMemo;