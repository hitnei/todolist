import * as types from './../constants/ActionTypes';

var InitialState = []

const listMemo = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_LISTMEMO:
            state = action.data;
            return state;
        default:
            return state;
    }
};
export default listMemo;